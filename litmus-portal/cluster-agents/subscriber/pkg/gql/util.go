package gql

import (
	"encoding/json"
	"strconv"
	"strings"

	"github.com/litmuschaos/litmus/litmus-portal/cluster-agents/subscriber/pkg/cluster/logs"
	"github.com/litmuschaos/litmus/litmus-portal/cluster-agents/subscriber/pkg/cluster/objects"
	"github.com/litmuschaos/litmus/litmus-portal/cluster-agents/subscriber/pkg/types"
	"github.com/sirupsen/logrus"
)

// process event data into proper format acceptable by gql
func MarshalGQLData(gqlData interface{}) (string, error) {
	data, err := json.Marshal(gqlData)
	if err != nil {
		return "", err
	}
	// process the marshalled data to make it gql compatible
	processed := strconv.Quote(string(data))
	processed = strings.Replace(processed, `\"`, `\\\"`, -1)
	return processed, nil
}

// generate gql mutation payload for workflow event
func GenerateWorkflowPayload(cid, accessKey, completed string, wfEvent types.WorkflowEvent) ([]byte, error) {
	clusterID := `{cluster_id: \"` + cid + `\", access_key: \"` + accessKey + `\"}`

	for id, event := range wfEvent.Nodes {
		event.Message = strings.Replace(event.Message, `"`, ``, -1)
		wfEvent.Nodes[id] = event
	}

	processed, err := MarshalGQLData(wfEvent)
	if err != nil {
		return nil, err
	}
	mutation := `{ workflow_id: \"` + wfEvent.WorkflowID + `\", workflow_run_id: \"` + wfEvent.UID + `\", completed: ` + completed + `, workflow_name:\"` + wfEvent.Name + `\", cluster_id: ` + clusterID + `, execution_data:\"` + processed[1:len(processed)-1] + `\"}`
	var payload = []byte(`{"query":"mutation { chaosWorkflowRun(workflowData:` + mutation + ` )}"}`)
	return payload, nil
}

// create pod log for normal pods and chaos-engine pods
func CreatePodLog(podLog types.PodLogRequest) (types.PodLog, error) {
	logDetails := types.PodLog{}
	mainLog, err := logs.GetLogs(podLog.PodName, podLog.PodNamespace, "main")
	// try getting argo pod logs
	if err != nil {
		logrus.Errorf("failed to get argo pod %v logs, err: %v", podLog.PodName, err)
		logDetails.MainPod = "Failed to get argo pod logs"
	} else {
		logDetails.MainPod = strconv.Quote(strings.Replace(mainLog, `"`, `'`, -1))
		logDetails.MainPod = logDetails.MainPod[1 : len(logDetails.MainPod)-1]
	}
	// try getting experiment pod logs if requested
	if strings.ToLower(podLog.PodType) == "chaosengine" && podLog.ChaosNamespace != nil {
		chaosLog := make(map[string]string)
		if podLog.ExpPod != nil {
			expLog, err := logs.GetLogs(*podLog.ExpPod, *podLog.ChaosNamespace, "")
			if err == nil {
				chaosLog[*podLog.ExpPod] = strconv.Quote(strings.Replace(expLog, `"`, `'`, -1))
				chaosLog[*podLog.ExpPod] = chaosLog[*podLog.ExpPod][1 : len(chaosLog[*podLog.ExpPod])-1]
			} else {
				logrus.Errorf("failed to get experiment pod %v logs, err: %v", *podLog.ExpPod, err)
			}
		}
		if podLog.RunnerPod != nil {
			runnerLog, err := logs.GetLogs(*podLog.RunnerPod, *podLog.ChaosNamespace, "")
			if err == nil {
				chaosLog[*podLog.RunnerPod] = strconv.Quote(strings.Replace(runnerLog, `"`, `'`, -1))
				chaosLog[*podLog.RunnerPod] = chaosLog[*podLog.RunnerPod][1 : len(chaosLog[*podLog.RunnerPod])-1]
			} else {
				logrus.Errorf("failed to get runner pod %v logs, err: %v", *podLog.RunnerPod, err)
			}
		}
		if podLog.ExpPod == nil && podLog.RunnerPod == nil {
			logDetails.ChaosPod = nil
		} else {
			logDetails.ChaosPod = chaosLog
		}
	}
	return logDetails, nil
}

func GenerateLogPayload(cid, accessKey string, podLog types.PodLogRequest) ([]byte, error) {
	clusterID := `{cluster_id: \"` + cid + `\", access_key: \"` + accessKey + `\"}`
	processed := " Could not get logs "
	// get the logs
	logDetails, err := CreatePodLog(podLog)
	if err == nil {
		// process log data
		processed, err = MarshalGQLData(logDetails)
		if err != nil {
			processed = " Could not get logs "
		}
	}
	mutation := `{ cluster_id: ` + clusterID + `, request_id:\"` + podLog.RequestID + `\", workflow_run_id: \"` + podLog.WorkflowRunID + `\", pod_name: \"` + podLog.PodName + `\", pod_type: \"` + podLog.PodType + `\", log:\"` + processed[1:len(processed)-1] + `\"}`
	var payload = []byte(`{"query":"mutation { podLog(log:` + mutation + ` )}"}`)

	return payload, nil
}

func GenerateKubeObject(cid string, accessKey string, kubeobjectrequest types.KubeObjRequest) ([]byte, error) {
	clusterID := `{cluster_id: \"` + cid + `\", access_key: \"` + accessKey + `\"}`
	kubeObj, err := objects.GetKubernetesObjects(kubeobjectrequest)
	if err != nil {
		return nil, err
	}
	processed, err := MarshalGQLData(kubeObj)
	if err != nil {
		return nil, err
	}
	mutation := `{ cluster_id: ` + clusterID + `, request_id:\"` + kubeobjectrequest.RequestID + `\", kube_obj:\"` + processed[1:len(processed)-1] + `\"}`

	var payload = []byte(`{"query":"mutation { kubeObj(kubeData:` + mutation + ` )}"}`)
	return payload, nil
}

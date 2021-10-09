It contains tunables, which are common for all pod-level experiments. These tunables can be provided at `.spec.experiment[*].spec.components.env` in chaosengine.

### Target Specific Pods

It defines the comma-separated name of the target pods subjected to chaos. The target pods can be tuned via `TARGET_PODS` ENV.

Use the following example to tune this:

[embedmd]:# (https://raw.githubusercontent.com/litmuschaos/litmus/master/mkdocs/docs/experiments/categories/pods/common/target-pods.yaml yaml)
```yaml
## it contains comma separated target pod names
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        ## comma separated target pod names
        - name: TARGET_PODS
          value: 'pod1,pod2'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Pod Affected Percentage

It defines the percentage of pods subjected to chaos with matching labels provided at `.spec.appinfo.applabel` inside chaosengine. It can be tuned with `PODS_AFFECTED_PERC` ENV. If `PODS_AFFECTED_PERC` is provided as `empty` or `0` then it will target a minimum of one pod.

Use the following example to tune this:

[embedmd]:# (https://raw.githubusercontent.com/litmuschaos/litmus/master/mkdocs/docs/experiments/categories/pods/common/pod-affected-percentage.yaml yaml)
```yaml
## it contains percentage of application pods to be targeted with matching labels or names in the application namespace
## supported for all pod-level experiment expect pod-autoscaler
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        # percentage of application pods
        - name: PODS_AFFECTED_PERC
          value: '100'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Target Specific Container

It defines the name of the targeted container subjected to chaos. It can be tuned via `TARGET_CONTAINER` ENV. If `TARGET_CONTAINER` is provided as empty then it will use the first container of the targeted pod.

Use the following example to tune this:

[embedmd]:# (https://raw.githubusercontent.com/litmuschaos/litmus/master/mkdocs/docs/experiments/categories/pods/common/target-container.yaml yaml)
```yaml
## name of the target container
## it will use first container as target container if TARGET_CONTAINER is provided as empty
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        # name of the target container
        - name: TARGET_CONTAINER
          value: 'nginx'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

import { IconButton, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import YAML from 'yaml';
import { ButtonOutlined } from 'litmus-ui';
import { useSelector } from 'react-redux';
import timeDifference from '../../../utils/datesModifier';
import useStyles from './styles';
import trimstring from '../../../utils/trim';
import WorkflowStatus from '../WorkflowStatus';
import LogsSwitcher from '../LogsSwitcher';
import { stepEmbeddedYAMLExtractor } from '../../../utils/yamlUtils';
import { ExecutionData } from '../../../models/graphql/workflowData';
import { RootState } from '../../../redux/reducers';

interface WorkflowNodeInfoProps {
  setIsInfoToggled: React.Dispatch<React.SetStateAction<boolean>>;
  manifest: string;
  cluster_id: string;
  workflow_run_id: string;
  data: ExecutionData;
}

const WorkflowNodeInfo: React.FC<WorkflowNodeInfoProps> = ({
  manifest,
  cluster_id,
  workflow_run_id,
  data,
  setIsInfoToggled,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isAppInfoVisible, setIsAppInfoVisible] = useState(false);

  const { pod_name } = useSelector((state: RootState) => state.selectedNode);

  const embeddedYAMLString = stepEmbeddedYAMLExtractor(
    manifest,
    data.nodes[pod_name].name
  );

  return (
    <div className={classes.root}>
      {/* Node Details */}

      {/* Header */}
      <div className={classes.header}>
        <Typography className={classes.title}>
          <strong>{trimstring(data.nodes[pod_name].name, 30)}</strong>
        </Typography>
        <ButtonOutlined
          className={classes.closeButton}
          onClick={() => {
            setIsInfoToggled(false);
          }}
        >
          &#x2715;
        </ButtonOutlined>
      </div>

      {/* Section */}
      <div className={classes.section}>
        {/* Left-Panel Containing details about selected Node. */}
        <div className={classes.leftPanel}>
          {/* Phase */}
          <WorkflowStatus phase={data.nodes[pod_name].phase} />
          {/* Start Time */}
          <Typography className={classes.textMargin}>
            <strong>
              {t('workflowDetailsView.workflowNodeInfo.startTime')}:
            </strong>
            &nbsp;&nbsp;&nbsp;
            <span>
              {data.nodes[pod_name].phase !== 'Pending'
                ? timeDifference(data.nodes[pod_name].startedAt)
                : '- -'}
            </span>
          </Typography>
          {/* End Time */}
          <Typography className={classes.textMargin}>
            <strong>
              {t('workflowDetailsView.workflowNodeInfo.endTime')}:
            </strong>
            &nbsp;&nbsp;&nbsp;
            {data.nodes[pod_name].finishedAt !== '' ? (
              <span>{timeDifference(data.nodes[pod_name].finishedAt)}</span>
            ) : (
              <span>- -</span>
            )}
          </Typography>
          {/* Duration */}
          <Typography className={classes.textMargin}>
            <strong>
              {t('workflowDetailsView.workflowNodeInfo.duration')}:
            </strong>
            &nbsp;&nbsp;&nbsp;
            {data.nodes[pod_name].finishedAt !== ''
              ? (
                  (parseInt(data.nodes[pod_name].finishedAt, 10) -
                    parseInt(data.nodes[pod_name].startedAt, 10)) /
                  60
                ).toFixed(1)
              : (
                  (new Date().getTime() / 1000 -
                    parseInt(data.nodes[pod_name].startedAt, 10)) /
                  60
                ).toFixed(1)}{' '}
            minutes
          </Typography>
          {/* Button to show Application Details */}
          {data.nodes[pod_name].type === 'ChaosEngine' && embeddedYAMLString && (
            <>
              <IconButton
                disabled={!YAML.parse(embeddedYAMLString).spec.appinfo}
                onClick={() => setIsAppInfoVisible(!isAppInfoVisible)}
                className={classes.buttonAlign}
              >
                {isAppInfoVisible ? (
                  <img
                    src="/icons/down-arrow.svg"
                    alt="down arrow icon"
                    className={classes.icon}
                  />
                ) : (
                  <img
                    src="/icons/right-arrow.svg"
                    alt="right-arrow icon"
                    className={classes.icon}
                  />
                )}
                <Typography>
                  <strong>
                    {t(
                      'workflowDetailsView.workflowNodeInfo.viewApplicationDetails'
                    )}
                  </strong>
                </Typography>
              </IconButton>
              {isAppInfoVisible && (
                <Typography className={classes.textMargin}>
                  {Object.keys(YAML.parse(embeddedYAMLString).spec.appinfo).map(
                    (key, index) => (
                      <div key={index.toString()}>
                        <strong>{key} :</strong>
                        <span>
                          &nbsp;&nbsp;
                          {YAML.parse(embeddedYAMLString).spec.appinfo[key]}
                        </span>
                      </div>
                    )
                  )}
                </Typography>
              )}
            </>
          )}
        </div>
        {/* Right Panel for Node Logs */}
        <div className={classes.rightPanel}>
          <LogsSwitcher
            cluster_id={cluster_id}
            workflow_run_id={workflow_run_id}
            pod_namespace={data.namespace}
            pod_type={data.nodes[pod_name].type}
            pod_name={pod_name}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkflowNodeInfo;

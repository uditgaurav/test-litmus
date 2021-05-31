import { Typography } from '@material-ui/core';
import { ButtonOutlined, Modal } from 'litmus-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DASHBOARD_TYPE_1,
  DASHBOARD_TYPE_2,
} from '../../../../pages/ApplicationDashboard/constants';
import useActions from '../../../../redux/actions';
import * as DashboardActions from '../../../../redux/actions/dashboards';
import { history } from '../../../../redux/configureStore';
import {
  getProjectID,
  getProjectRole,
} from '../../../../utils/getSearchParams';
import useStyles from './styles';

interface DataSourceInactiveModalProps {
  dataSourceStatus: string;
  dashboardType: string;
  dashboardID: string;
  dashboardName: string;
}

const DataSourceInactiveModal: React.FC<DataSourceInactiveModalProps> = ({
  dataSourceStatus,
  dashboardType,
  dashboardID,
  dashboardName,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  // get ProjectID
  const projectID = getProjectID();
  const projectRole = getProjectRole();
  const dashboard = useActions(DashboardActions);

  return (
    <Modal
      open
      onClose={() => {
        history.goBack();
      }}
      modalActions={
        <ButtonOutlined
          className={classes.closeButton}
          onClick={() => {
            history.goBack();
          }}
        >
          &#x2715;
        </ButtonOutlined>
      }
      width="60%"
      height="fit-content"
    >
      <div className={classes.modal}>
        <Typography className={classes.modalHeading} align="left">
          {`${t(
            'analyticsDashboard.monitoringDashboardPage.dataSourceIs'
          )} ${dataSourceStatus}`}
        </Typography>
        <Typography align="left" className={classes.modalBody}>
          {t('analyticsDashboard.monitoringDashboardPage.dataSourceError')}
        </Typography>
        <div className={classes.flexButtons}>
          <ButtonOutlined
            onClick={() => {
              let dashboardTemplateID: number = -1;
              if (dashboardType === DASHBOARD_TYPE_1) {
                dashboardTemplateID = 0;
              } else if (dashboardType === DASHBOARD_TYPE_2) {
                dashboardTemplateID = 1;
              }
              dashboard.selectDashboard({
                selectedDashboardID: dashboardID,
                selectedDashboardName: dashboardName,
                selectedDashboardTemplateID: dashboardTemplateID,
              });
              history.push({
                pathname: '/analytics/dashboard/configure',
                search: `?projectID=${projectID}&projectRole=${projectRole}`,
              });
            }}
          >
            <img
              src="/icons/disconnected.svg"
              alt="disconnected"
              className={classes.buttonIcon}
            />
            <Typography className={classes.buttonText}>
              {t(
                'analyticsDashboard.monitoringDashboardPage.reConfigureDashboard'
              )}
            </Typography>
          </ButtonOutlined>
          <Typography align="left" className={classes.modalBodyText}>
            {t('analyticsDashboard.monitoringDashboardPage.or')}
          </Typography>
          <ButtonOutlined
            onClick={() => {
              history.push({
                pathname: '/analytics/datasource/configure',
                search: `?projectID=${projectID}&projectRole=${projectRole}`,
              });
            }}
          >
            <img
              src="/icons/disconnected.svg"
              alt="disconnected"
              className={classes.buttonIcon}
            />
            <Typography className={classes.buttonText}>
              {t('analyticsDashboard.monitoringDashboardPage.updateDataSource')}
            </Typography>
          </ButtonOutlined>
        </div>
      </div>
    </Modal>
  );
};

export default DataSourceInactiveModal;

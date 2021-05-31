import { useQuery } from '@apollo/client';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loader from '../../../components/Loader';
import Center from '../../../containers/layouts/Center';
import Scaffold from '../../../containers/layouts/Scaffold';
import {
  GET_CHARTS_DATA,
  GET_HUB_STATUS,
  GET_PREDEFINED_WORKFLOW_LIST,
} from '../../../graphql';
import { Chart, Charts, HubStatus } from '../../../models/redux/myhub';
import { getProjectID, getProjectRole } from '../../../utils/getSearchParams';
import ChartCard from './chartCard';
import HeaderSection from './headerSection';
import useStyles from './styles';
import BackButton from '../../../components/Button/BackButton';

interface ChartName {
  ChaosName: string;
  ExperimentName: string;
}

interface URLParams {
  hubname: string;
}

const MyHub: React.FC = () => {
  // Get Parameters from URL
  const paramData: URLParams = useParams();
  const projectID = getProjectID();
  // Get all MyHubs with status
  const { data: hubDetails } = useQuery<HubStatus>(GET_HUB_STATUS, {
    variables: { data: projectID },
    fetchPolicy: 'cache-and-network',
  });

  // Filter the selected MyHub
  const UserHub = hubDetails?.getHubStatus.filter((myHub) => {
    return paramData.hubname === myHub.HubName;
  })[0];

  const classes = useStyles();

  const { t } = useTranslation();

  // Query to get charts of selected MyHub
  const { data, loading } = useQuery<Charts>(GET_CHARTS_DATA, {
    variables: {
      HubName: paramData.hubname,
      projectID,
    },
    fetchPolicy: 'network-only',
  });

  const { data: predefinedData, loading: predefinedLoading } = useQuery(
    GET_PREDEFINED_WORKFLOW_LIST,
    {
      variables: {
        hubname: paramData.hubname,
        projectid: projectID,
      },
      fetchPolicy: 'network-only',
    }
  );

  // State for searching charts
  const [search, setSearch] = useState('');
  const [searchPredefined, setSearchPredefined] = useState('');

  const changeSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value as string);
  };
  const handlePreDefinedSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchPredefined(event.target.value as string);
  };
  const [totalExp, setTotalExperiment] = useState<ChartName[]>([]);
  const exp: ChartName[] = [];

  // Function to convert UNIX time in format of DD MMM YYY
  const formatDate = (date: string) => {
    const updated = new Date(parseInt(date, 10) * 1000).toString();
    const resDate = moment(updated).format('DD MMM YYYY hh:mm:ss A');
    if (date) return resDate;
    return 'Date not available';
  };

  const [expanded, setExpanded] = React.useState<string | false>('panel2');

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (data !== undefined) {
      const chartList = data.getCharts;
      chartList.forEach((expData: Chart) => {
        expData.Spec.Experiments.forEach((expName) => {
          exp.push({
            ChaosName: expData.Metadata.Name,
            ExperimentName: expName,
          });
        });
      });
      setTotalExperiment(exp);
    }
  }, [data]);

  return loading || predefinedLoading ? (
    <Backdrop open className={classes.backdrop}>
      <Loader />
      <Center>
        <Typography variant="h4" align="center">
          {t('myhub.myhubChart.syncingRepo')}
        </Typography>
      </Center>
    </Backdrop>
  ) : (
    <Scaffold>
      <BackButton />
      <div className={classes.header}>
        <Typography variant="h3" gutterBottom>
          {UserHub?.HubName}
        </Typography>
        <Typography variant="h5">
          {t('myhub.myhubChart.repoLink')}
          <strong>
            {UserHub?.RepoURL}/{UserHub?.RepoBranch}
          </strong>
        </Typography>
        <Typography className={classes.lastSyncText}>
          {t('myhub.myhubChart.lastSynced')}{' '}
          {formatDate(UserHub ? UserHub.LastSyncedAt : '')}
        </Typography>
        {/* </div> */}
      </div>
      <Accordion
        square
        classes={{
          root: classes.MuiAccordionroot,
        }}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography variant="h4">
            <strong>{t('myhub.myhubChart.preDefined')}</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.mainDiv}>
            <HeaderSection
              searchValue={searchPredefined}
              changeSearch={handlePreDefinedSearch}
            />
            <div className={classes.chartsGroup}>
              {predefinedData?.GetPredefinedWorkflowList.length > 0 ? (
                predefinedData?.GetPredefinedWorkflowList.filter(
                  (data: string) =>
                    data.toLowerCase().includes(searchPredefined.trim())
                ).map((expName: string) => {
                  return (
                    <ChartCard
                      key={expName}
                      expName={{
                        ChaosName: 'predefined',
                        ExperimentName: expName,
                      }}
                      UserHub={UserHub}
                      setSearch={setSearchPredefined}
                      projectID={projectID}
                      userRole={getProjectRole()}
                      isPredefined
                    />
                  );
                })
              ) : (
                <>
                  <img
                    src="/icons/no-experiment-found.svg"
                    alt="no experiment"
                    width="80px"
                    height="80px"
                  />
                  <Typography variant="h5" className={classes.noExp}>
                    {t('myhub.myhubChart.noExp')}
                  </Typography>
                </>
              )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        classes={{
          root: classes.MuiAccordionroot,
        }}
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        className={classes.chartAccordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography variant="h4">
            <strong>{t('myhub.myhubChart.chaosCharts')}</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.mainDiv}>
            <HeaderSection searchValue={search} changeSearch={changeSearch} />
            <div className={classes.chartsGroup}>
              {totalExp &&
                totalExp.length > 0 &&
                totalExp
                  .filter(
                    (data) =>
                      data.ChaosName.toLowerCase().includes(search.trim()) ||
                      data.ExperimentName.toLowerCase().includes(search.trim())
                  )
                  .map((expName: ChartName) => {
                    return (
                      <ChartCard
                        key={`${expName.ChaosName}-${expName.ExperimentName}`}
                        expName={expName}
                        UserHub={UserHub}
                        setSearch={setSearch}
                        projectID={projectID}
                        userRole={getProjectRole()}
                        isPredefined={false}
                      />
                    );
                  })}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </Scaffold>
  );
};

export default MyHub;

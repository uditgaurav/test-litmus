import { makeStyles, Theme } from '@material-ui/core';

interface PopOverStyleProps {
  xLoc: number;
  yLoc: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  modalContainer: (props: PopOverStyleProps) => ({
    position: 'absolute',
    width: '12.34375rem',
    left: props.xLoc !== 0 ? `${props.xLoc + 12.5}px` : '-100px',
    top: `${props.yLoc + 130}px`,
  }),
  root: {
    borderRadius: '3px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `2px 1px 9px rgba(124, 124, 124, 0.25)`,
  },
  date: {
    background: theme.palette.primary.main,
    borderRadius: '3px 3px 0px 0px',
    paddingTop: theme.spacing(0.5),
  },
  testDate: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    verticalAlign: 'middle',
    display: 'inline-flex',
    color: theme.palette.secondary.contrastText,
  },
  testsPassed: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    verticalAlign: 'middle',
    display: 'inline-flex',
    fontWeight: 500,
  },
  testsFailed: {
    paddingBottom: theme.spacing(1.5),
    verticalAlign: 'middle',
    display: 'inline-flex',
    fontWeight: 500,
  },
  resilienceScore: {
    paddingTop: theme.spacing(1.5),
    verticalAlign: 'middle',
    display: 'inline-flex',
    fontWeight: 500,
  },
  miniIcons: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: 'block',
  },
  dateIcon: {
    backgroundColor: theme.palette.primary.main,
    width: 23,
    height: 22,
    paddingLeft: theme.spacing(0.375),
    marginTop: theme.spacing(0.25),
  },
  resilienceScoreIcon: {
    backgroundColor: theme.palette.warning.main,
    width: 18,
    height: 18,
  },
  timeLineIcon: {
    color: theme.palette.secondary.contrastText,
    width: 15,
    marginLeft: theme.spacing(0.25),
    height: 18,
  },
  passedIcon: {
    backgroundColor: theme.palette.secondary.contrastText,
    width: 20,
    height: 20,
  },
  failedIcon: {
    backgroundColor: theme.palette.secondary.contrastText,
    width: 20,
    height: 20,
  },
  checkMarkIcon: {
    color: theme.palette.success.main,
    width: 20,
    height: 20,
  },
  cancelMarkIcon: {
    color: theme.palette.error.main,
    width: 20,
    height: 20,
  },
}));

export default useStyles;

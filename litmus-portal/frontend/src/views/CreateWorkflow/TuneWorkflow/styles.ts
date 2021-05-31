import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    paddingTop: theme.spacing(2),
    margin: '0 auto',
    marginBottom: theme.spacing(-2), // Overriding because LitmusStepper has default padding bottom
    height: '100%',
  },

  // Header
  headerWrapper: {
    padding: theme.spacing(0, 7),
  },

  heading: {
    marginTop: theme.spacing(3),
    fontSize: '1.2rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4rem',
    },
    fontWeight: 'bold',
  },

  headerBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '40%',
    [theme.breakpoints.up('lg')]: {
      width: '25%',
    },
  },

  descriptionWrapper: {
    padding: theme.spacing(3, 0),
    justifyContent: 'space-between',
  },

  description: {
    width: '50%',
    fontSize: '1rem',
    [theme.breakpoints.up('lg')]: {
      width: '70%',
    },
  },

  // Header Buttons [Edit YAML, Add Exp]
  editBtn: {
    border: 'none !important',
    color: theme.palette.highlight,
  },

  // Experiment Section
  experimentWrapper: {
    background: theme.palette.cards.header,
    padding: theme.spacing(2, 7),
  },

  // Modal
  closeButton: {
    borderColor: theme.palette.border.main,
    marginTop: theme.spacing(-3.75),
  },

  modal: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(10),
    },
    width: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  // Table
  table: {
    minWidth: '40rem',
    minHeight: '23rem',
  },
  revertChaos: {
    margin: theme.spacing(3, 0),
    minWidth: '40rem',
  },
  wrapper: {
    padding: theme.spacing(1, 0),
  },
  key: {
    margin: theme.spacing(1, 2),
  },
  selection: {
    cursor: 'pointer',

    '&:hover': {
      background: theme.palette.background.default,
    },
  },

  // Styles for Add Experiment Modal
  addExpModal: {
    textAlign: 'left',
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',

    '& ::-webkit-scrollbar': {
      width: '0.4rem',
    },
    '& ::-webkit-scrollbar-track': {
      marginTop: theme.spacing(1),
      webkitBoxShadow: `inset 0 0 8px ${theme.palette.common.black}`,
    },
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.light,
      borderRadius: 8,
    },
    '& img': {
      userDrag: 'none',
    },
  },
  doneBtn: {
    marginLeft: 'auto',
    marginTop: theme.spacing(2.5),
    marginRight: theme.spacing(2),
  },
  inputDiv: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(2.5),
    alignItems: 'center',
  },
  formControl: {
    height: '2.5rem',
    width: '20rem',
    marginTop: 20,
  },
  selectText: {
    height: '2.5rem',
    padding: theme.spacing(0.5),
  },
  label: {
    color: theme.palette.common.black,
  },
  closeBtn: {
    color: theme.palette.secondary.contrastText,
  },
  saveTemplateRoot: {
    margin: theme.spacing(8, 5, 5, 5),
  },

  // Editor
  editor: {
    height: '100%',
  },

  // Confirmation Modal
  confirmDiv: {
    margin: 'auto',
    marginTop: theme.spacing(31.25),
    width: '30rem',
  },
  confirmText: {
    fontSize: '2.25rem',
  },
  backBtn: {
    margin: theme.spacing(2.5, 5, 0, 0),
  },
  continueBtn: {
    marginTop: theme.spacing(2.5),
  },
  updateText: {
    fontSize: '1.6rem',
    marginBottom: theme.spacing(3.75),
    textAlign: 'left',
  },

  // Sequence Modal
  sequenceMainDiv: {
    padding: theme.spacing(7.5),
  },
  sequenceDiv: {
    textAlign: 'left',
    marginBottom: theme.spacing(6.25),
  },
  dropText: {
    fontSize: '1.2rem',
  },
  radioList: {
    width: '100%',
    alignItems: 'center',
    height: '26rem',
    overflowY: 'auto',
  },
  experimentCard: {
    backgroundColor: theme.palette.cards.background,
    lineHeight: '5rem', // Making the div content vertically aligned
    padding: theme.spacing(0, 5),
    margin: theme.spacing(1, 0),
    display: 'flex',
  },
  experimentName: {
    fontSize: '1rem',
  },
}));

export default useStyles;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

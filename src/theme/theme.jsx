import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

// import WorkSansTTF from '../assets/fonts/WorkSans-VariableFont_wght.ttf';

// const WorkSans = {
//   fontFamily: 'Work Sans Thin',
//   fontStyle: 'normal',
//   fontDisplay: 'swap',
//   fontWeight: 400,
//   src: `
//     local('Work Sans Thin'),
//     local('Work Sans Thin'),
//     url(${WorkSansTTF}) format('truetype')
//   `,
//   unicodeRange:
//     'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
// };

export const colors = {
  white: "#fff",
  black: "#000",
  darkBlue: "#2c3b57",
  blue: "#2F80ED",
  gray: "#e1e1e1",
  lightGray: "#737373",
  lightBlack: "#6a6a6a",
  darkBlack: "#141414",
  green: "#1abc9c",
  //red: "#ed4337",
  orange: "orange",
  //pink: "#DC6BE5",
  compoundGreen: "#00d395",
  tomato: "#e56b73",
  purple: "#935dff",

  text: "#212529",
  lightBlue: "#2F80ED",
  topaz: "#0b8f92",
  darkGray: "rgba(43,57,84,.5)",
  borderBlue: "rgba(25, 101, 233, 0.5)",

  customDark1: "#172029",
  bgColor1: "#172029",
  bgColor2: "rgb(116, 211, 224, 0.1)",
  bgColor3: "rgb(217, 217, 217, 0.1)",
  bgColor4: "rgb(27, 59, 83)",
  textColor1: "#06C4DE",
  textColor2: "rgb(165, 169, 173)",
  red: "rgb(232, 108, 112)",
  lightred: "rgb(232, 108, 112, 0.4)",
  pink: "rgb(189, 92, 230,1)",
  bgColor4: "rgb(34, 46, 61)",
  labelColor1: "rgb(150, 155, 162)",
  borderColor1: "rgb(34, 46, 61)",

};

// const breakpoints = createBreakpoints({
//   keys: ["xs", "sm", "md", "lg", "xl"],
//   values: {
//     xs: 0,
//     sm: 600,
//     md: 900,
//     lg: 1200,
//     xl: 1800
//   }
// })

const theme = {
  palette: {
    background: {
      default: colors.bgColor1
    },
    // primary: {
    //   main: colors.white
    // },
    // secondary: {
    //   main: colors.topaz
    // },
    // text: {
    //   primary: colors.text,
    //   secondary: colors.text
    // }
  },

  // test: {
  //   color: 'red'
  // },
  typography: {
    fontFamily: [
      '"Work Sans Thin"',
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    h1: {
      fontSize: "48px",
      fontWeight: "600",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h2: {
      fontSize: "36px",
      fontWeight: "600",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h3: {
      fontSize: "22px",
      fontWeight: "600",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h4: {
      fontSize: "16px",
      fontWeight: "600",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h5: {
      fontSize: "14px",
      fontWeight: "600",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h6: {
      fontSize: "12px",
      fontWeight: "600",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    body1: {
      fontSize: "16px",
      fontWeight: "300",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale"
    },
    body2: {
      fontSize: "16px",
      fontWeight: "300",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale"
    }
  },

  // type: 'light',
  overrides: {
    //   MuiCssBaseline: {
    //     '@global': {
    //       '@font-face': [WorkSans],
    //     },
    //   },
    //   MuiSelect: {
    //     select: {
    //       padding: '9px'
    //     },
    //     selectMenu: {
    //       minHeight: '30px',
    //       display: 'flex',
    //       alignItems: 'center'
    //     }
    //   },
    //   MuiButton: {
    //     root: {
    //       borderRadius: '50px',
    //       padding: '10px 24px'
    //     },
    //     outlined: {
    //       padding: '10px 24px',
    //       borderWidth: '2px !important'
    //     },
    //     text: {
    //       padding: '10px 24px'
    //     },
    //     label: {
    //       textTransform: 'none',
    //       fontSize: '1rem'
    //     }
    //   },
    //   MuiInputBase: {
    //     input: {
    //       fontSize: '16px',
    //       fontWeight: '600',
    //       WebkitFontSmoothing: "antialiased",
    //       MozOsxFontSmoothing: "grayscale",
    //       lineHeight: 1.2
    //     }
    //   },
    //   MuiOutlinedInput: {
    //     input: {
    //       "&::placeholder": {
    //         color: colors.text
    //       },
    //       color: colors.text,
    //       padding: '14px',
    //       borderRadius: '50px'
    //     },
    //     root: {
    //       // border: "none !important",
    //       borderRadius: '50px'
    //     },
    //     notchedOutline: {
    //       // border: "none !important"
    //     }
    //   },
    //   MuiSnackbar : {
    //     root: {
    //       maxWidth: 'calc(100vw - 24px)'
    //     },
    //     anchorOriginBottomLeft: {
    //       bottom: '12px',
    //       left: '12px',
    //       '@media (min-width: 960px)': {
    //         bottom: '50px',
    //         left: '80px'
    //       }
    //     }
    //   },
    //   MuiSnackbarContent: {
    //     root: {
    //       backgroundColor: colors.white,
    //       padding: '0px',
    //       minWidth: 'auto',
    //       '@media (min-width: 960px)': {
    //         minWidth: '500px',
    //       }
    //     },
    //     message: {
    //       padding: '0px'
    //     },
    //     action: {
    //       marginRight: '0px'
    //     }
    //   },
    // MuiAccordion: {
    //   root: {
    //     border: "1px solid " + colors.borderBlue,
    //     borderRadius: "50px",
    //     margin: "8px 0px",
    //     "&:before": {
    //       //underline color when textfield is inactive
    //       backgroundColor: "none",
    //       height: "0px"
    //     }
    //   }
    // },
    // MuiAccordionSummary: {
    //   root: {
    //     padding: "12px 24px",
    //     "@media (min-width: 960px)": {
    //       padding: "30px 42px"
    //     }
    //   },
    //   content: {
    //     margin: "0px !important"
    //   }
    // },
    // MuiAccordionDetails: {
    //   root: {
    //     padding: "0 12px 15px 12px",
    //     "@media (min-width: 960px)": {
    //       padding: "0 24px 30px 24px"
    //     }
    //   }
    // }
    //   MuiToggleButton: {
    //     root: {
    //       borderRadius: '50px',
    //       textTransform: 'none',
    //       minWidth:  '100px',
    //       border: 'none',
    //       background: colors.white,
    //       '& > span > h4': {
    //         color: '#555',
    //       },
    //       '&:hover': {
    //         backgroundColor: "rgba(47,128,237, 0.2)",
    //       },
    //       "&$selected": {
    //         backgroundColor: '#2f80ed',
    //         '& > span > h4': {
    //           color: '#fff',
    //         },
    //         '&:hover': {
    //           backgroundColor: "rgba(47,128,237, 0.2)",
    //           '& > span > h4': {
    //             color: '#000',
    //           },
    //         },
    //       }
    //     }
    //   },
    //   MuiPaper: {
    //     elevation1: {
    //       boxShadow: 'none'
    //     }
    //   },
    //   MuiToggleButtonGroup: {
    //     root: {
    //       border: '1px solid '+colors.borderBlue,
    //       borderRadius: '50px',
    //     },
    //     groupedSizeSmall: {
    //       padding: '42px 30px'
    //     }
    //   },
    //   MuiFormControlLabel: {
    //     label: {
    //       color: colors.darkBlack,
    //       fontSize: '14px',
    //       fontWeight: '600',
    //       WebkitFontSmoothing: "antialiased",
    //       MozOsxFontSmoothing: "grayscale",
    //       lineHeight: 1.2
    //     }
    //   }
  }

  // breakpoints: breakpoints
};

export default theme;

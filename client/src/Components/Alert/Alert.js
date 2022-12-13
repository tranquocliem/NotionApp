import { immediateToast } from "izitoast-react";
import "izitoast-react/dist/iziToast.css";

export const MyAlert = (title, message, timeout) => {
  if (title === "err") {
    immediateToast("error", {
      message: message,
      position: "topRight",
      timeout: timeout,
    });
  } else if (title === "succ") {
    immediateToast("success", {
      message: message,
      position: "topRight",
      timeout: timeout,
    });
  } else if (title === "que") {
    immediateToast("question", {
      message: message,
      position: "center",
      title: "Cảnh Báo",
      timeout: timeout,
      color: "dark",
      icon: "fa fa-user",
      progressBarColor: "rgb(0, 255, 184)",
      buttons: [
        [
          "<button>Ok</button>",
          function (instance, toast) {
            console.log("Delete");
            instance.hide(
              {
                transitionOut: "fadeOutUp",
              },
              toast
            );
          },
        ],
        [
          "<button>Close</button>",
          function (instance, toast) {
            instance.hide(
              {
                transitionOut: "fadeOutUp",
              },
              toast
            );
          },
        ],
      ],
    });
  } else {
    immediateToast("warning", {
      message: message,
      position: "topRight",
      timeout: timeout,
    });
  }
};

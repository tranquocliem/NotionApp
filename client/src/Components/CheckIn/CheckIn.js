import { useEffect, useState } from "react";
import { createCheckIn } from "../../Service/CheckInService";
import { MyAlert } from "../Alert/Alert";
import "./index.css";

function CheckIn(props) {
  const [dataCapcha, setDataCapcha] = useState();
  const [inputCapcha, setInputCapcha] = useState("");
  const [pending, setPending] = useState(false);

  let allCharacters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ];
  function getCaptcha() {
    let randomCharacter = [];
    for (let i = 0; i < 6; i++) {
      randomCharacter.push(
        allCharacters[Math.floor(Math.random() * allCharacters.length)]
      );
    }
    return randomCharacter.join("");
  }
  useEffect(() => {
    setDataCapcha(getCaptcha());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reloadCapcha = () => {
    setDataCapcha(getCaptcha());
  };

  const onChangeInputCapcha = (e) => {
    setInputCapcha(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    if (inputCapcha && inputCapcha === dataCapcha) {
      const data = await createCheckIn();
      if (data && data.status) {
        setPending(false);
        MyAlert("succ", `Bạn Đã ${data.message}`, 4500);
        props.history.push("/tai-khoan/tranquocliem");
      } else {
        MyAlert("err", data.message, 3500);
        return setPending(false);
      }
    }

    if (!inputCapcha) {
      MyAlert("warr", "Vui lòng không bỏ trống", 3500);
      return setPending(false);
    }

    if (inputCapcha !== dataCapcha) {
      MyAlert("warr", "Mã xác nhận không đúng", 3500);
      return setPending(false);
    }
  };

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Check In</h3>
              <i className="text-muted">(*) Vui lòng không bỏ trống</i>
              <div className="captcha-area d-flex justify-content-center py-4">
                <div className="captcha-img">
                  <img
                    src={require("../../img/captcha-bg.png")}
                    alt="Captch Background"
                  />
                  <span className="captcha">{dataCapcha}</span>
                </div>
                <div className="justify-content-end">
                  <button className="reload-btn" onClick={reloadCapcha}>
                    <i className="fas fa-redo-alt"></i>
                  </button>
                </div>
              </div>
              <div className="status-text"></div>
              <form className="forms-sample">
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputCapcha">Mã xác nhận (*)</label>
                  <input
                    name="codecapcha"
                    type="text"
                    className="form-control text-light"
                    id="exampleInputCapcha"
                    placeholder="Mã xác nhận"
                    value={inputCapcha}
                    onChange={onChangeInputCapcha}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary my-3"
                  onClick={onSubmit}
                >
                  Check In
                </button>
              </form>
            </div>
          </div>
          {pending ? (
            <div className="loadingModal">
              <div className="spinner-border loading-spinner" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default CheckIn;

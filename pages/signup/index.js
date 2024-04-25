import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Header from "@/component/Header";
// import login from "@/app/api/login";
// import Cookies from "js-cookie";
// import swal from "sweetalert";
import { useRouter } from "next/router";
import { DatePicker } from "antd";
import UploadImage from "@/utils/UploadImage";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import get_list_class from "@/app/api/get_list_class";
import verify_email from "@/app/api/verfiy_email";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import OTPInput from "react-otp-input";
import complete_singup from "@/app/api/complete_signup";
import axios from "axios";
import upload_image from "@/app/api/upload_image";
import swal from "sweetalert";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dob, setDob] = useState();
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState();
  const [classId, setClassId] = useState("");
//   const [account, setAccount] = useState("");
//   const [password, setPassword] = useState("");
  const [email, setEmail]= useState("")
  const [listClass, setListClass] = useState([]);
  const [open, setOpen]= useState(false)
  const [otp, setOtp]= useState("")
  const handleClose = () => {
    setOpen(false);
    setOtp("")
  };
  useEffect(() => {
    (async () => {
      const result = await get_list_class();
      return setListClass(result);
    })();
  }, []);
  return (
    <MDBContainer fluid>
      <Header />
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Student signup
              </p>
              <div className="d-flex flex-row align-items-center mb-4 w-75">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  label="Your first name"
                  id="form4"
                  type="text"
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4 w-75">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  label="Your middle name"
                  id="form5"
                  type="text"
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4 w-75">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                    style={{width: '100%'}}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  label="Your last name"
                  id="form6"
                  type="text"
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4 w-75">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  label="Your phone"
                  id="form7"
                  type="text"
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4 w-75">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Your email"
                  id="form8"
                  type="text"
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4 w-75">
                <DatePicker
                  getPopupContainer={(triggerNode) => {
                    return triggerNode.parentNode;
                  }}
                  style={{ width: "100%", height: 50, margin: "12px 0" }}
                  onChange={(date, dateString) => {
                    setDob(date?.format("DD/MM/YYYY"));
                  }}
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4 w-75">
                <UploadImage
                  style={{ width: "100%", height: 50, margin: "12px 0" }}
                  setImage={setAvatar}
                  title={"Avatar"}
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4 w-75">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Class</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={classId || ""}
                    label="Class"
                    onChange={(e) => setClassId(e.target.value)}
                  >
                    {listClass?.map((item, key) => (
                      <MenuItem key={key} value={item?.class_id}>
                        {item?.class_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <MDBBtn
                onClick={async () => {
                  try {
                    const result= await verify_email(email)
                    console.log(result)
                    if(result?.send=== true) {
                        setOpen(()=> true)
                    }
                  } catch (error) {
                    console.log(error)
                  }
                }}
                className="mb-4"
                size="lg"
              >
                Signup
              </MDBBtn>
              <br />
              <div className="">You have an account?</div>
              <br />
              <MDBBtn
                onClick={() => {
                  router.push("/login");
                }}
                className="mb-4"
                size="lg"
              >
                Login
              </MDBBtn>
              <br />
            </MDBCol>
            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Verify account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div style={{textAlign: "center", marginBottom: 12}}>We{"'"} sent to you a code include 6 digit to complete signup, Please check your email and type code to below field</div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputStyle={{width: 40, height: 40, color: "#000", backgroundColor: "#fff"}}
                    renderSeparator={<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>}
                    renderInput={(props) => <input style={{width: 40, height: 40, background: "#fff"}} {...props} />}
                />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant={"contained"} onClick={(async ()=> {
            const result= await complete_singup(email, otp)
            if(result?.complete=== true) {
                if(avatar.thumbUrl) {
                    const avatarfinal= await upload_image(avatar.thumbUrl)
                    const res= await axios({
                        url: "/api/v/pending/signup",
                        method: "post",
                        data: {
                            firstName, lastName, middleName, phone, dob, avatar: avatarfinal.img, classId: classId, email
                        }
                    })
                    const result= await res.data
                    if(result?.add=== true) {
                        swal("Notice", "Add student success, wait admin approve", "success")
                        .then(()=> handleClose())
                        .then(()=> router.push("/login"))
                    }
                    else {
                        swal("Notice", "Signup failed", "error")
                    }
                }
                else {

                }
            }
            else {
                swal("Notice", "Verify code is not correct", "error")
            }
          })}>Agree</Button>
        </DialogActions>
      </Dialog>
    </MDBContainer>
  );
}

export default Signup;

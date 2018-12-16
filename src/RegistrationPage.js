import React, { Component } from 'react';

//Bootstrap Component
import { Grid, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//Styles
import './Style/style.css';

//Routing
//import history from '../Routing/history';

//Redux Data
//import { connect } from 'react-redux';
//import * as Action from '../Store/Action';

const styles = {
    margin: 10,
};

const TitleItems = [
    <MenuItem value={"Mr."} key={1} primaryText={`Mr.`} />,
    <MenuItem value={"Mrs."} key={2} primaryText={`Mrs.`} />,
    <MenuItem value={"Miss."} key={3} primaryText={`Miss.`} />,
    <MenuItem value={"Ms."} key={4} primaryText={`Ms.`} />,
    <MenuItem value={"Dr."} key={5} primaryText={`Dr.`} />
];

const SuffixItems = [
    <MenuItem value={"Jr."} key={1} primaryText={`Jr.`} />,
    <MenuItem value={"Sr."} key={2} primaryText={`Sr.`} />,
    <MenuItem value={"I"} key={3} primaryText={`I`} />,
    <MenuItem value={"II"} key={4} primaryText={`II`} />,
    <MenuItem value={"III"} key={5} primaryText={`III`} />,
    <MenuItem value={"IV"} key={5} primaryText={`IV`} />
];

var APIUrl;
var S3APIUrl;
var MailAPIUrl;

class Registration extends Component {
    constructor() {
        super();
        /* Field State Values Initialization */
        this.state = {
            value: null,
            CompanyNameState: "",
            TitleState: "",
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            SuffixState: "",
            PhoneNumState: "",
            HomeNumState: "",
            EmailState: "",
            ConfirmEmailState: "",
            PasswordState: "",
            ConfirmPasswordState: "",
            isValidCompanyName: false,
            isValidTitle: false,
            isValidFirstName: false,
            isValidLastName: false,
            isValidEmail: false,
            isValidCEmail: false,
            isValidPassword: false,
            isValidCPassword: false,
            isValidFormatFirstName: false,
            isValidFormatLastName: false,
            isValidFormatPhoneNum: false,
            isValidFormatHomeNum: false,
            isValidFormatPassword: false,
            isValidFormatCPassword: false,
            isValidPwdMatch: false,
            validRFNameForm: null,
            validRLNameForm: null,
            errorMsgMedium: false,
            errorMsgGood: false,
            errorMsgStrong: false,
            showValidMsg: false,
            value: null,
            LoginPopupOpen: false,
        }
    }

    /* Form Fields Binding Values Handling Events*/
    handleChangeTitle = (event, index, value) => {
        this.setState({ TitleState: value });
    };

    handleChangeFirstName(e) {
        this.setState({ FirstNameState: e.target.value }, () => { this.handleValidationFirstName(this); });
    }

    handleValidationFirstName() {
        if (this.state.FirstNameState.length > 0) {
            this.setState({ isValidFirstName: false });
            if (this.state.FirstNameState.length > 0 && this.state.FirstNameState.length > 2) {
                this.setState({ isValidFormatFirstName: false });
                this.setState({ validRFNameForm: true });
            }
            else {
                this.setState({ isValidFormatFirstName: true });
                this.setState({ isValidFirstName: false });
            }
        }
        else {
            this.setState({ isValidFirstName: true });
            this.setState({ isValidFormatFirstName: false });
            this.setState({ validRFNameForm: false });
        }
    }

    handleChangeMiddleName(e) {
        this.setState({ MiddleNameState: e.target.value });
    }

    handleChangeLastName(e) {
        this.setState({ LastNameState: e.target.value }, () => { this.handleValidationLastName(this); });
    }

    handleValidationLastName() {
        if (this.state.LastNameState.length > 0) {
            this.setState({ isValidLastName: false });
            if (this.state.LastNameState.length > 0 && this.state.LastNameState.length > 2) {
                this.setState({ isValidFormatLastName: false });
                this.setState({ validRLNameForm: true });
            }
            else {
                this.setState({ isValidFormatLastName: true });
                this.setState({ isValidLastName: false });
            }
        }
        else {
            this.setState({ isValidLastName: true });
            this.setState({ isValidFormatLastName: false });
            this.setState({ validRLNameForm: false });
        }
    }

    handleChangeSuffix = (event, index, value) => {
        this.setState({ SuffixState: value });
    };

    handleChangePhoneNum(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ PhoneNumState: onlyNums });
        }
    }

    handleChangeHomeNum(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ HomeNumState: onlyNums });
        } else if (onlyNums.length === 11) {
            const number = onlyNums.replace(/(\d{3})(\d{4})(\d{4})/, '($1) $2-$3');
            this.setState({ HomeNumState: number });
        }
    }

    handleChangeEmail(e) {
        this.setState({ EmailState: e.target.value });
    }

    handleChangeConfirmEmail(e) {
        this.setState({ ConfirmEmailState: e.target.value });
    }

    handleChangePassword(e) {
        this.setState({ PasswordState: e.target.value });
        if (this.state.PasswordState.length < 8) {
            this.setState({ errorMsgMedium: false })
            this.setState({ errorMsgGood: false })
            this.setState({ errorMsgStrong: false })
        }
        if (this.state.PasswordState.length > 7 && this.state.PasswordState.length < 9) {
            this.setState({ errorMsgMedium: true })
            this.setState({ errorMsgGood: false })
            this.setState({ errorMsgStrong: false })
        }
        if (this.state.PasswordState.length > 8 && this.state.PasswordState.length < 11) {
            this.setState({ errorMsgMedium: false })
            this.setState({ errorMsgGood: true })
            this.setState({ errorMsgStrong: false })
        }
        if (this.state.PasswordState.length > 10) {
            this.setState({ errorMsgMedium: false })
            this.setState({ errorMsgGood: false })
            this.setState({ errorMsgStrong: true })
        }
    }

    handleChangeConfirmPassword(e) {
        this.setState({ ConfirmPasswordState: e.target.value });
    }

    /* Form Fields Validation Handling Event*/
    handleValidateForm(event) {
        let validForm = false;
        var validCompanyNameForm = false;
        var validTitleForm = false;
        var validFNameForm = false;
        var validLNameForm = false;
        var validEmailForm = false;
        var validCEmailForm = false;
        var validPwdForm = false;
        var validCPwdForm = false;
        var varValidatePassword = this.state.PasswordState;
        var varValidateConfirmPassword = this.state.ConfirmPasswordState;

        if (this.state.CompanyNameState != "") {
            this.setState({ isValidCompanyName: false });
            validCompanyNameForm = true;
        }
        else {
            this.setState({ isValidCompanyName: true });
            validCompanyNameForm = false;
        }

        if (this.state.TitleState != "") {
            this.setState({ isValidTitle: false });
            validTitleForm = true;
        }
        else {
            this.setState({ isValidTitle: true });
            validTitleForm = false;
        }

        if (this.state.validRFNameForm == true) {
            this.setState({ isValidFirstName: false });
            validFNameForm = true;
        }
        else if (this.state.validRFNameForm == false) {
            this.setState({ isValidFirstName: true });
            validFNameForm = false;
        }
        else {
            if (this.state.FirstNameState.length > 0) {
                this.setState({ isValidFirstName: false });
                validFNameForm = true;
            }
            else {
                this.setState({ isValidFirstName: true });
                validFNameForm = false;
            }
        }

        if (this.state.validRLNameForm == true) {
            this.setState({ isValidLastName: false });
            validLNameForm = true;
        }
        else if (this.state.validRLNameForm == false) {
            this.setState({ isValidLastName: true });
            validLNameForm = false;
        }
        else {
            if (this.state.LastNameState.length > 0) {
                this.setState({ isValidLastName: false });

                validLNameForm = true;
            }
            else {
                this.setState({ isValidLastName: true });
                validLNameForm = false;
            }
        }

        if (this.state.PhoneNumState.length > 0) {
            if (this.state.PhoneNumState.length > 0 && this.state.PhoneNumState.length > 9) {
                this.setState({ isValidFormatPhoneNum: false });
            }
            else {
                this.setState({ isValidFormatPhoneNum: true });
            }
        }
        else {
            this.setState({ isValidFormatPhoneNum: false });
        }

        if (this.state.HomeNumState.length > 0) {
            if (this.state.HomeNumState.length > 0 && this.state.HomeNumState.length > 9) {
                this.setState({ isValidFormatHomeNum: false });
            }
            else {
                this.setState({ isValidFormatHomeNum: true });
            }
        }
        else {
            this.setState({ isValidFormatHomeNum: false });
        }

        if (this.state.EmailState.length > 0) {
            this.setState({ isValidEmail: false });
            validEmailForm = true;
        }
        else {
            this.setState({ isValidEmail: true });
            validEmailForm = false;
        }

        if (this.state.ConfirmEmailState.length > 0) {
            this.setState({ isValidCEmail: false });
            validCEmailForm = true;
        }
        else {
            this.setState({ isValidCEmail: true });
            validCEmailForm = false;
        }

        if (this.state.PasswordState.length > 0) {
            this.setState({ isValidPassword: false });
            var varPasswordFormat = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            if (this.state.PasswordState.length > 0 && this.state.PasswordState.length > 7 && varPasswordFormat.test(varValidatePassword)) {
                this.setState({ isValidFormatPassword: false });
                validPwdForm = true;
            }
            else {
                this.setState({ isValidFormatPassword: true });
                this.setState({ isValidPassword: false });
            }
        }
        else {
            this.setState({ isValidPassword: true });
            this.setState({ isValidFormatPassword: false });
            validPwdForm = false;
        }

        if (this.state.ConfirmPasswordState.length > 0) {
            this.setState({ isValidCPassword: false });
            var varPasswordFormat = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            if (this.state.ConfirmPasswordState.length > 0 && this.state.ConfirmPasswordState.length > 7 && varPasswordFormat.test(varValidateConfirmPassword)) {
                this.setState({ isValidFormatCPassword: false });
                if (this.state.PasswordState == this.state.ConfirmPasswordState) {
                    this.setState({ isValidPwdMatch: false });
                    validCPwdForm = true;
                }
                else {
                    this.setState({ isValidPwdMatch: true });
                    this.setState({ isValidCPassword: false });
                }
            }
            else {
                this.setState({ isValidFormatCPassword: true });
                this.setState({ isValidCPassword: false });
                this.setState({ isValidPwdMatch: false });
            }
        }
        else {
            this.setState({ isValidCPassword: true });
            this.setState({ isValidFormatCPassword: false });
            this.setState({ isValidPwdMatch: false });
            validCPwdForm = false;
        }

        if (validCompanyNameForm && validTitleForm && validFNameForm && validLNameForm && validEmailForm && validCEmailForm && validPwdForm && validCPwdForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }

        return validForm;
    }

    /* Page Rendering */
    render() {
        const tooltip = (
            <Tooltip id="tooltip" >
                Password required at least 1 uppercase and 1 lowercase,1 digit,1 symbol, minimum 8 character's length.
            </Tooltip>
        );
        return (
            <div>
                <MuiThemeProvider>
                    <Grid>
                        <Col xs={12} md={12}>
                            <Row className="show-grid">
                                <Col xs={12} md={12}>
                                    <h3>APPLICANT REGISTRATION</h3>
                                </Col>
                            </Row>
                            <Row>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} >
                                    <SelectField floatingLabelText={<span>Title<span className="manatoryfield">&nbsp;*</span> </span>}
                                        value={this.state.TitleState}
                                        onChange={this.handleChangeTitle}
                                        errorText={this.state.isValidTitle ? "Please Select Your Title" : ""}
                                        maxHeight={200}
                                    >
                                        {TitleItems}
                                    </SelectField>
                                </Col>
                                <Col xs={12} md={6} >
                                    <SelectField floatingLabelText={<span>Title<span className="manatoryfield">&nbsp;*</span> </span>}
                                        value={this.state.TitleState}
                                        onChange={this.handleChangeTitle}
                                        errorText={this.state.isValidTitle ? "Please Select Your Title" : ""}
                                        maxHeight={200}
                                    >
                                        {TitleItems}
                                    </SelectField>
                                </Col>
                            </Col>
                            </Row>                           
                        </Col>
                    </Grid>
                </MuiThemeProvider>
            </div >
        );
    }

    /* Fields Reset Handle Event */
    handleReset(e) {
        this.setState({
            value: null,
            TitleState: "",
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            SuffixState: "",
            PhoneNumState: "",
            HomeNumState: "",
            PasswordState: "",
            ConfirmPasswordState: "",
            isValidCompanyName: false,
            isValidTitle: false,
            isValidFirstName: false,
            isValidLastName: false,
            isValidEmail: false,
            isValidCEmail: false,
            isValidPassword: false,
            isValidCPassword: false,
            isValidFormatFirstName: false,
            isValidFormatLastName: false,
            isValidFormatPhoneNum: false,
            isValidFormatHomeNum: false,
            isValidFormatPassword: false,
            isValidFormatCPassword: false,
            isValidPwdMatch: false,
            errorMsgMedium: false,
            errorMsgGood: false,
            errorMsgStrong: false,
            showValidMsg: false,
            value: null
        });
    }
}

// // react redux only: on 03/29/2018
// const mapReducerStateToProps = (state) => {
//     return {
//         LoginData: state.Login_Reducer,
//         UserData: state.User_Reducer,
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setUserID: (PLUserID) => {
//             dispatch(Action.setUserID(PLUserID));
//         },
//         setPassword: (PLPassword) => {
//             dispatch(Action.setPassword(PLPassword));
//         },
//         setUserName: (PUserName) => {
//             dispatch(Action.setUserName(PUserName));
//         },
//         setCCompanyID: (PCCompanyID) => {
//             dispatch(Action.setCCompanyID(PCCompanyID));
//         },
//         setUTCStatus: (PUTCStatus) => {
//             dispatch(Action.setUTCStatus(PUTCStatus));
//         }
//     }
// }

// export default connect(mapReducerStateToProps, mapDispatchToProps)(Registration);

export default (Registration);
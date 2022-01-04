import { Fragment, React, Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";
import showResults from "../../showResults/showResults";
import UserService from "../../../services/user.service";
import { AddCNF } from "../../../abi/cnf";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import Web3 from "web3";

require("dotenv").config();

var HDWalletProvider = require("@truffle/hdwallet-provider");

const user = JSON.parse(localStorage.getItem("user"));

export default class ListCNF extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  async componentDidMount() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(process.env.REACT_APP_ADDRESS_CNF, AddCNF, signer);
    let transaction = await contract.getAllData();
    this.setState({
      content: transaction,
    });

    console.log("data dari blockchainya nih", transaction);
  }

  render() {
    const fields = [
      { key: "walletAddress", label: "Signer"},
      { key: "role_pembuat", label: "Created By"},
      { key: "nomor_dokumen", label: "Document Number"},
      { key: "tanggal_dokumen", label: "Document Date"},
      { key: "created", label: "Created"},
    ];
    return (
      <Fragment>
        <main className="c-main">
          <div className="container-fluid">
            <CRow>
              <CCol xs="12">
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol xs={6} md={7} lg={10} style={{ margin: "auto" }}>
                        <h4 style={{ margin: "auto" }}>CNF</h4>
                      </CCol>
                      {(() => {
                        if (user && (user.status_role === "grosir" || user.status_role === "roaster")) {
                          return(
                            <CCol>
                              <CButton
                                block
                                color="dark"
                                to="/AddCNF"
                                style={{ backgroundColor: "#00c4cc" }}
                              >
                                Add
                              </CButton>
                            </CCol>
                          )
                        }
                      })()}
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={this.state.content}
                      fields={fields}
                      itemsPerPage={10}
                      tableFilter
                      cleaner
                      itemsPerPageSelect
                      hover
                      sorter
                      pagination
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </div>
        </main>
      </Fragment>
    );
  }
}

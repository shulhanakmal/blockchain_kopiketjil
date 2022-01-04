import { Fragment, React, useState, useEffect, Component } from "react";
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

export default class ListSupplier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getListSupplier().then((response) => {
      this.setState({
        content: response.data,
      });
    });
  }

  deleteSupplier = (item) => {
    UserService.deleteSupplier(item.id).then(showResults("Data has been deleted"));
  };

  render() {
    const fields = [
      {
        key: "nama_supplier",
        label: "Coffee Processor",
        _style: { width: "40%" },
      },
      { key: "lokasi_supplier", label: "Origin", _style: { width: "30%" } },
      {
        key: "show_details",
        label: "",
        _style: { width: "30%" },
        filter: false,
      },
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
                        <h4 style={{ margin: "auto" }}>
                          Coffee Processor Data
                        </h4>
                      </CCol>
                      <CCol>
                        <CButton
                          block
                          color="dark"
                          to="/listSupplier/daftar"
                          style={{ backgroundColor: "#00c4cc" }}
                        >
                          Add
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={this.state.content.supplier}
                      fields={fields}
                      itemsPerPage={10}
                      pagination
                      scopedSlots={{
                        show_details: (item) => {
                          return (
                            <td
                              className="py-2"
                              style={{
                                textAlign: "center",
                                verticalAlign: "center",
                              }}
                            >
                              <CButton
                                size="sm"
                                color="info"
                                to={`/listSupplier/editSupplier/${item.id}`}
                                style={{ backgroundColor: "#178d88" }}
                              >
                                Edit
                              </CButton>
                              <CButton
                                size="sm"
                                color="danger"
                                className="ml-1"
                                onClick={() => this.deleteSupplier(item)}
                                style={{ backgroundColor: "#e2602c" }}
                              >
                                Delete
                              </CButton>
                            </td>
                          );
                        },
                      }}
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

import { Fragment, React, Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import UserService from "../../../services/user.service";
import showResults from "../../showResults/showResults";

export default class ListBiji extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getListJenis().then((response) => {
      this.setState({
        content: response.data,
      });
    });
  }

  deleteBiji = (item) => {
    UserService.deleteBiji(item.id).then(showResults("Data has been deleted"));
  };

  deleteJenis = (item) => {
    UserService.deleteJenis(item.id).then(showResults("Data has been deleted"));
  };

  deleteProses = (item) => {
    UserService.deleteProses(item.id).then(showResults("Data has been deleted"));
  };

  deleteUnit = (item) => {
    UserService.deleteUnit(item.id).then(showResults("Data has been deleted"));
  };

  render() {
    const fieldBiji = [
      { key: "nama_biji", label: "Name", _style: { width: "40%" } },
      { key: "deskripsi_biji", label: "Description", _style: { width: "30%" } },
      {
        key: "show_details",
        label: "",
        _style: { width: "30%" },
        filter: false,
      },
    ];
    const fieldJenis = [
      { key: "nama_jenis", label: "Name", _style: { width: "40%" } },
      {
        key: "deskripsi_jenis",
        label: "Description",
        _style: { width: "30%" },
      },
      {
        key: "show_details",
        label: "",
        _style: { width: "30%" },
        filter: false,
      },
    ];
    const fieldProses = [
      { key: "nama_proses", label: "Name", _style: { width: "40%" } },
      {
        key: "deskripsi_proses",
        label: "Description",
        _style: { width: "30%" },
      },
      {
        key: "show_details",
        label: "",
        _style: { width: "30%" },
        filter: false,
      },
    ];
    const fieldUnit = [
      { key: "nama_unit", label: "Unit", _style: { width: "90%" } },
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
            <CCard>
              <CCardBody>
                <CTabs>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink>Beans</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Variety</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Process</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Unit</CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent>
                    <CTabPane>
                      <CRow>
                        <CCol xs="12">
                          <CCardHeader>
                            <CRow>
                              <CCol
                                xs={6}
                                md={7}
                                lg={10}
                                style={{ margin: "auto" }}
                              >
                                <h4 style={{ margin: "auto" }}>Beans Data</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/listBiji/daftarBiji"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.biji}
                              fields={fieldBiji}
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
                                        to={`/listBiji/editBiji/${item.id}`}
                                        style={{ backgroundColor: "#178d88" }}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        style={{ backgroundColor: "#e2602c" }}
                                        onClick={() => this.deleteBiji(item)}
                                      >
                                        Delete
                                      </CButton>
                                    </td>
                                  );
                                },
                              }}
                            />
                          </CCardBody>
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane>
                      <CRow>
                        <CCol xs="12">
                          <CCardHeader>
                            <CRow>
                              <CCol
                                xs={6}
                                md={7}
                                lg={10}
                                style={{ margin: "auto" }}
                              >
                                <h4 style={{ margin: "auto" }}>Variety Data</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/listBiji/daftarVarietas"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.jenis}
                              fields={fieldJenis}
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
                                        to={`/listBiji/editVarietas/${item.id}`}
                                        style={{ backgroundColor: "#178d88" }}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        onClick={() => this.deleteJenis(item)}
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
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane>
                      <CRow>
                        <CCol xs="12">
                          <CCardHeader>
                            <CRow>
                              <CCol
                                xs={6}
                                md={7}
                                lg={10}
                                style={{ margin: "auto" }}
                              >
                                <h4 style={{ margin: "auto" }}>Process Data</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/listBiji/daftarProses"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.proses}
                              fields={fieldProses}
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
                                        to={`/listBiji/editProses/${item.id}`}
                                        style={{ backgroundColor: "#178d88" }}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        onClick={() => this.deleteProses(item)}
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
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane>
                      <CRow>
                        <CCol xs="12">
                          <CCardHeader>
                            <CRow>
                              <CCol
                                xs={6}
                                md={7}
                                lg={10}
                                style={{ margin: "auto" }}
                              >
                                <h4 style={{ margin: "auto" }}>Unit Data</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/listBiji/daftarUnit"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.unit}
                              fields={fieldUnit}
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
                                        to={`/listBiji/editUnit/${item.id}`}
                                        style={{ backgroundColor: "#178d88" }}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        onClick={() => this.deleteUnit(item)}
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
                        </CCol>
                      </CRow>
                    </CTabPane>
                  </CTabContent>
                </CTabs>
              </CCardBody>
            </CCard>
          </div>
        </main>
      </Fragment>
    );
  }
}

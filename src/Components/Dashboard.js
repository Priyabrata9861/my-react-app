import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./Lo.css";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { FaBuildingColumns } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Col, Button, Row, Form, Modal, Card } from "react-bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function UserList() {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div
      style={{
        height: "100%",
        minHeight: "400px",
        width: "310px",
        float: "left",
      }}
    >
      <Sidebar collapsed={collapsed}>
        <Menu>
          <MdDashboard />
          <MenuItem component={<Link to="/dashboard" />}> Dashboard </MenuItem>
          <FaUser />
          <MenuItem component={<Link to="/user" />}> Users </MenuItem>
          <HiMiniUsers />
          <SubMenu label="Clients">
            <MenuItem component={<Link to="/ClientManagement" />}>
              {" "}
              Client Management{" "}
            </MenuItem>
            <MenuItem> Building Management </MenuItem>
            <MenuItem> Client Representative </MenuItem>
            <MenuItem> Client Representative </MenuItem>
          </SubMenu>
          <FaBuildingColumns />
          <SubMenu label="Jobs">
            <MenuItem component={<Link to="/JobManagement" />}>
              {" "}
              Job Management{" "}
            </MenuItem>
            <MenuItem> Upload CSV </MenuItem>
          </SubMenu>
          <BiSolidReport />
          <SubMenu label="Reports">
            <MenuItem component={<Link to="/Shortcodes" />}>
              {" "}
              Shortcodes{" "}
            </MenuItem>
            <MenuItem> Report Templates </MenuItem>
            <MenuItem> Manage Reports </MenuItem>
          </SubMenu>
          <RiAdminFill />
          <SubMenu label="SIAQ Admin">
            <MenuItem> Role </MenuItem>
            <MenuItem> Menu </MenuItem>
            <MenuItem> Role Menu </MenuItem>
            <MenuItem> Manage Survey Threshold </MenuItem>
            <MenuItem> Designation </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      <div>
        <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
          - O-
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    alert("LogOut Successfully");
  };

  useEffect(() => {
    Swal.fire({
      title: "Login Sucess",

      icon: "Sucess",
      confirmButtonText: "OK",
    });
    let token = localStorage.getItem("milu");

    if (!token) {
      navigate("/");
    }
    getAllClientDD();
    setSelectedBuildingsBar(122);
    setSelectedYearForBar();
    getBuildingCompGraphParamDD();
  }, []);

  const [client, setClient] = useState([]);
  const [buildingDD, setBuildingDD] = useState([]);
  const [yearForSurvey, SetYearForSurvey] = useState([]);
  const [ParameterForBar, setParameterForBar] = useState("");
  const [selectedClientForBar, setSelectedClientForBar] = useState([]);
  const [isYearVisible, setIsYearVisible] = useState(true);
  const [selectedBuildingsBar, setSelectedBuildingsBar] = useState([]);
  const { register, handleSubmit, control, reset } = useForm();
  const [selectedGroupByBar, setselectedGroupByBar] = useState([]);
  const [selectedParameterBar, setSelectedParameterBar] = useState([]);
  const [selectedYearForBar, setSelectedYearForBar] = useState([]);
  const [selectedEnvironmentBar, setSelectedEnvironmentBar] = useState([]);
  const [YearForBar, setYearForBar] = useState([]);
  const [selectedClientForBuilding, setSelectedClientForBuilding] = useState(
    []
  );
  const [jobPie, setJobPie] = useState([]);
  const [xAxisCategoriesArea, setXAxisCategoriesArea] = useState("");
  const [param, setParam] = useState("");
  const [dataForArea, setDataForArea] = useState("");
  const [surveyStaticsLoader, setSurveyStaticsLoader] = useState(true);

  const token = localStorage.getItem("milu");

  const getAllClientDD = async () => {
    axios
      .post("https://new.siaqreporting.com/api/v1/client/getAllClientDD", [], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("_________________", res);
        const data = [
          { value: "", label: "Select Client", isDisabled: true },
          ...res.data.data.list.map((item) => ({
            value: item.clientId.toString(),
            label: item.clientName,
          })),
        ];
        setClient(data);
      })
      .catch((error) => {});
  };

  const getBuilding = async (value) => {
    let formData = new FormData();
    formData.append("clientId", Number(value));
    axios
      .post(
        "https://new.siaqreporting.com/api/v1/client/getAllBuildingDD",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const data = [
          {
            value: "",
            label: "BuildingName",
            isDisabled: true,
          },
          ...res.data.data.list.map((item) => ({
            value: item.id.toString(),
            label:
              item.name +
              "at" +
              (item.adress2 ? item.adress1 + "," + item.adress2 : item.adress1),
          })),
        ];
        setBuildingDD(data);
      })
      .catch((err) => {});
  };

  const getYearForSurveyStatistics = async (value) => {
    let formData = new FormData();
    let userid = JSON.parse(localStorage.getItem("user"));
    formData.append("userId", 1);
    formData.append("clientId", value);
    axios
      .post(
        "https://new.siaqreporting.com/api/v1/dashboard/getYearDD",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const data = [
          { value: "", label: "Select Year", isDisabled: true },
          ...res.data.data.list.map((item) => ({
            value: item.year.toString(), // Convert id to string, if needed
            label: item.year,
          })),
        ];
        SetYearForSurvey(data);
      })
      .catch((err) => {});
  };

  const getBuildingCompGraphParamDD = async () => {
    await axios
      .post(
        " https://new.siaqreporting.com/api/v1/client/getBuildingCompGraphParamDD",
        [],
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        const data = [
          { value: "", label: "Select Parameter", isDisabled: true },
          ...res.data.data.paramDD.map((item) => {
            // Extract text content and original HTML string
            const value = item.htmlDisplayName.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
            // const value = item.htmlDisplayName.replace(/<[^>]+>/g, '').replace(/\(|\)/g, ''); // Remove HTML tags and parentheses

            return {
              value: item.columnName.toString(), // Convert id to string, if needed
              label: value.trim(), // Trim leading and trailing whitespace
              html: item.htmlDisplayName, // Retain original HTML string
            };
          }),
        ];
        setParameterForBar(data);
      });
  };

  const handleClientChange = (e) => {
    setSelectedClientForBar(e.target.value.value);
    setBuildingDD("");
    getBuilding(e.target.value.value);
    getYearForSurveyStatistics(e.target.value.value);
  };

  const handleClientChangeForBuilding = (e) => {
    setSelectedClientForBuilding(e.target.value.value);
    setBuildingDD("");
  };

  const handleBuildingChange = (e) => {
    if (e.target.value.value != "") {
      setSelectedBuildingsBar(e.target.value.value);
    }
  };

  const handleGroupByChange = (e) => {
    const selectedValue = e ? e.value : "";
    if (selectedValue === "year") {
      setIsYearVisible(false);
    } else {
      setIsYearVisible(true);
    }
    setselectedGroupByBar(e.value);
  };

  const handleYearChange = (e) => {
    setSelectedYearForBar(e.target.value.value);
  };

  const handleEnvironmentChange = (e) => {
    setSelectedEnvironmentBar(e.target.value.value);
  };

  const handleParameterChange = (e) => {
    if (selectedBuildingsBar != "") {
      setSelectedBuildingsBar(selectedBuildingsBar);
    }
    setSelectedParameterBar(e.target.value.value);
  };

  return (
    <main>
      <div>
        <UserList />
        <button className="z" onClick={handleLogOut}>
          sysadmin LogOut
        </button>
        <br></br>
        <br></br>
        <p>Hi, Welcome Back..</p>
        <br></br>
        <div className="row mb-3">
          <div className="col">
            <div className="card bg-info">
              <h3>77</h3>
              <p>Clients</p>
            </div>
          </div>
          <div className="col">
            <div className="card bg-success">
              <h3>694</h3>
              <p>Buildings</p>
            </div>
          </div>
          <div className="col">
            <div className="card bg-danger">
              <h3>3781</h3>
              <p>Jobs</p>
            </div>
          </div>
          <div className="col">
            <div className="card bg-primary">
              <h3>2662</h3>
              <p>Surveys Completed </p>
            </div>
          </div>
          <div className="col">
            <div className="card bg-warning">
              <h3>2642</h3>
              <p>Reports Generated</p>
            </div>
          </div>
        </div>
        <br></br>
        <section className="op">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                <div className="select-container-box box-1-com row">
                  <div className=" col-lg-2">
                    <Controller
                      control={control}
                      name="clientBar"
                      {...register("clientBar", {
                        onChange: (data) => handleClientChange(data),
                      })}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            size="sm"
                            options={client}
                            placeholder={
                              <>
                                {"Client "}
                                <span className="text-danger">*</span>
                              </>
                            }
                            name="clientBar"

                            // defaultValue={{ label: "Canderel", value: "192" }}
                          />
                        </>
                      )}
                    />
                  </div>

                  <div className=" col-lg-2">
                    <Controller
                      control={control}
                      name="buildingBar"
                      {...register("buildingBar", {
                        onChange: (e) => handleBuildingChange(e),
                      })}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            size="sm"
                            options={buildingDD}
                            placeholder={
                              <>
                                {"Building"}
                                <span className="text-danger">*</span>
                              </>
                            }
                            name="buildingBar"
                          />
                        </>
                      )}
                    />
                  </div>
                  <div className=" col-lg-2">
                    <Controller
                      control={control}
                      name="groupBy"
                      {...register("groupBy", {
                        // onChange: (e) => handleBuildingChange(e),
                      })}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            size="sm"
                            options={[
                              {
                                value: "0",
                                label: "Select...",
                                isDisabled: true,
                              },
                              { value: "month", label: "Month" },
                              { value: "year", label: "Year" },
                            ]}
                            placeholder={
                              <>
                                {" "}
                                {"GroupBy"}
                                <span className="text-danger">*</span>
                              </>
                            }
                            onChange={(e) => handleGroupByChange(e)}
                          />
                        </>
                      )}
                    />
                  </div>
                  {isYearVisible && (
                    <div className="col-lg-2">
                      <Controller
                        control={control}
                        name="yearBar"
                        {...register("year", {
                          onChange: (e) => handleYearChange(e),
                        })}
                        render={({ field }) => (
                          <>
                            <Select
                              {...field}
                              size="sm"
                              options={yearForSurvey}
                              // placeholder="Year"
                              placeholder={
                                <>
                                  {"Year"}
                                  <span className="text-danger">*</span>
                                </>
                              }
                            />
                          </>
                        )}
                      />
                    </div>
                  )}
                  <div className="col-lg-2">
                    <Controller
                      control={control}
                      name="environmentBar "
                      {...register("encironmentBar", {
                        onChange: (e) => handleEnvironmentChange(e),
                      })}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            size="sm"
                            options={[
                              {
                                value: 0,
                                label: "Select...",
                                isDisabled: true,
                              },
                              { value: "true", label: "Indoor" },
                              { value: false, label: "Outdoor" },
                            ]}
                            placeholder={
                              <>
                                {"Environment"}
                                <span className="text-danger">*</span>
                              </>
                            }
                          />
                        </>
                      )}
                    />
                  </div>
                  <div className="col-lg-2">
                    <Controller
                      control={control}
                      name="parameterBar"
                      {...register("parameterBar", {
                        onChange: (e) => handleParameterChange(e),
                      })}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            size="sm"
                            options={ParameterForBar}
                            placeholder={
                              <>
                                {"Parameter"}
                                <span className="text-danger">*</span>
                              </>
                            }
                          />
                        </>
                      )}
                    />
                  </div> 
                </div>
                <br></br>
                <h6>Survey Statistics</h6>
              </div>
              <div className="col-lg-4">
                <div className="content-view-jobs box-1-com row">
                  <Col lg="4">
                    <Controller
                      control={control}
                      name="yearBar"
                      {...register("yearBar", {
                        // onChange: (e) => { hadlePieYearChange(e.target.value.value) }
                      })}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            size="sm"
                            options={YearForBar}
                            placeholder={
                              <>
                                {"Year"}
                                <span className="text-danger">*</span>
                              </>
                            }
                          />
                        </>
                      )}
                    />
                  </Col>
                  <Col lg="4">
                    <h6 className="p-2">
                      Completed:{" "}
                      <span className="color-1">{jobPie[0]?.completed}</span>
                    </h6>
                  </Col>
                  <Col lg="4">
                    <h6 className="p-2">
                      Pending:{" "}
                      <span className="color-2">{jobPie[1]?.incompleted}</span>
                    </h6>
                  </Col>
                </div>
                <br></br>
                {/* <HighChartPieChart {...PropsForPie} /> */}
                <h6>Job Status</h6>
              </div>
            </div>
          </div>
          <br></br>
        </section>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 mt-4">
              <div className="select-container-box box-1-com row">
                <Col lg="2">
                  <Controller
                    control={control}
                    name="clientcolumn"
                    {...register("clientBuilding", {
                      onChange: (e) => {
                        handleClientChangeForBuilding(e);
                      },
                    })}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          size="sm"
                          options={client}
                          placeholder={
                            <>
                              {"Client"}
                              <span className="text-danger">*</span>
                            </>
                          }
                          name="clientColumn"
                        />
                      </>
                    )}
                  />
                </Col>
                <Col lg="3">
                  <Controller
                    control={control}
                    name="buildingcolumn"
                    {...register("", {
                      onChange: (e) => {
                        // handleBuildingChangeForCity(e);
                      },
                    })}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          size="sm"
                          // options={buildingDDCity}
                          placeholder={
                            <>
                              {"Building"}
                              <span className="text-danger">*</span>
                            </>
                          }
                          name="buildingColumn"
                        />
                      </>
                    )}
                  />
                </Col>
                <Col lg="2">
                  <Controller
                    control={control}
                    name="groupBycolumn"
                    {...register("", {
                      onChange: (e) => {
                        // handleBuildingChangeForCity(e);
                      },
                    })}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          size="sm"
                          // options={buildingDDCity}
                          placeholder={
                            <>
                              {"Group By"}
                              <span className="text-danger">*</span>
                            </>
                          }
                          name="groupByColumn"
                        />
                      </>
                    )}
                  />
                </Col>
                <Col lg="1">
                  <Controller
                    control={control}
                    name="yearcolumn"
                    {...register("", {
                      onChange: (e) => {
                        // handleBuildingChangeForCity(e);
                      },
                    })}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          size="sm"
                          // options={buildingDDCity}
                          placeholder={
                            <>
                              {"Year"}
                              <span className="text-danger">*</span>
                            </>
                          }
                          name="yearColumn"
                        />
                      </>
                    )}
                  />
                </Col>
                <Col lg="2">
                  <Controller
                    control={control}
                    name="environmentcolumn"
                    {...register("", {
                      onChange: (e) => {
                        // handleBuildingChangeForCity(e);
                      },
                    })}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          size="sm"
                          // options={buildingDDCity}
                          placeholder={
                            <>
                              {"Environment"}
                              <span className="text-danger">*</span>
                            </>
                          }
                          name="environmentColumn"
                        />
                      </>
                    )}
                  />
                </Col>
                <Col lg="2">
                  <Controller
                    control={control}
                    name="parametercolumn"
                    {...register("", {
                      onChange: (e) => {
                        // handleBuildingChangeForCity(e);
                      },
                    })}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          size="sm"
                          // options={buildingDDCity}
                          placeholder={
                            <>
                              {"Parameter"}
                              <span className="text-danger">*</span>
                            </>
                          }
                          name="parameterColumn"
                        />
                      </>
                    )}
                  />
                </Col>
              </div>
              <br></br>
              <h6>Building Comparison Graph</h6>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;

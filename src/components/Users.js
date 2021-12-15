import MaterialTable from 'material-table'
import { useState, useEffect } from 'react';
import Api from '../API';
import { CsvBuilder } from 'filefy';

function Users() {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
    const [selectedRows, setSelectedRows] = useState([]);

    const [tableData, setTableData] = useState([
        {
            EmployeeId: 1,
            EmployeeName: "siam",
            EmployeePassword: "1234",
            EmployeeEmail: "siam@uxd.co.jp",
            EmployeeFullName: "Fahim Siam",
            EmployeeBatchId: "202109",
            EmployeeIsAdmin: "0",
            EmployeeNumber: "1872627888",
            EmployeeAddress: "OLD DHAKA"
        },
        // { EmployeeId: "1", EmployeeName: "siam" },
        // { EmployeeId: "5", EmployeeName: "maruf" },
        // { EmployeeId: "8", EmployeeName: "allUser" },
        // { EmployeeId: "4", EmployeeName: "anas" },

    ])

    // const column = [
    //         { title: "EmployeeId", field: "EmployeeId", emptyValue: () => <em>null</em>, filtering: false },
    //         { title: "EmployeeName", field: "EmployeeName", emptyValue: () => <em>null</em>, filtering: true },
    //         { title: "EmployeeEmail", field: "EmployeeEmail", emptyValue: () => <em>null</em>, filtering: true },
    //         { title: "EmployeeFullName", field: "EmployeeFullName", emptyValue: () => <em>null</em>, filtering: true },
    //         { title: "EmployeeBatchId", field: "EmployeeBatchId", emptyValue: () => <em>null</em>, filtering: true },
    //         { title: "EmployeeNumber", field: "EmployeeNumber", emptyValue: () => <em>null</em>, filtering: true },
    //         { title: "EmployeeAddress", field: "EmployeeAddress", emptyValue: () => <em>null</em>, filtering: true },
    //     ]


    const columns = [
        {
            title: "EmployeeId", field: "EmployeeId", emptyValue: () => <em>null</em>, filtering: false, editable: false,
            headerStyle: { pointerEvents: "none", textAlign: "left", }
        },
        {
            title: "EmployeeName", field: "EmployeeName", emptyValue: () => <em>null</em>, filtering: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: "EmployeeEmail", field: "EmployeeEmail", emptyValue: () => <em>null</em>, filtering: true, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: "EmployeeFullName", field: "EmployeeFullName", emptyValue: () => <em>null</em>, filtering: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: "EmployeeBatchId", field: "EmployeeBatchId", emptyValue: () => <em>null</em>, filtering: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: "EmployeeIsAdmin", field: "EmployeeIsAdmin", emptyValue: () => <em>null</em>, filtering: true, lookup: { 0: "User", 1: "Moderator", 2: "Admin" },
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: "EmployeeNumber", field: "EmployeeNumber", emptyValue: () => <em>null</em>, filtering: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: "EmployeeAddress", field: "EmployeeAddress", emptyValue: () => <em>null</em>, filtering: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
    ]

    // custom export data in CSV
    const customRowExport = () => {

        new CsvBuilder("All Users Information.csv")
            .setColumns(columns.map(col => col.title))
            .addRows(selectedRows.map(rowData => columns.map(col => rowData[col.field])))
            .exportFile();

    }

    const editUserData = (rowDetails) => {
        if (rowDetails.EmployeeName !== "" && rowDetails.EmployeeEmail !== "" && rowDetails.EmployeePassword !== "" && rowDetails.EmployeeIsAdmin !== "") {
            console.log("Required Filled")

            console.log(rowDetails)
            console.log("/users/editUserInformation")
            Api({
                method: 'post',
                url: '/users/editUserInformation',
                data: {
                    EmployeeName: rowDetails.EmployeeName,
                    EmployeeEmail: rowDetails.EmployeeEmail,
                    EmployeePassword: rowDetails.EmployeePassword,
                    EmployeeIsAdmin: rowDetails.EmployeeIsAdmin,
                    EmployeeFullName: rowDetails.EmployeeFullName,
                    EmployeeBatchId: rowDetails.EmployeeBatchId,
                    EmployeeNumber: rowDetails.EmployeeNumber,
                    EmployeeAddress: rowDetails.EmployeeAddress
                }
            }).then(response => {
                if (response.data.success == 1) {
                    fetchTableData()
                    alert("Success")
                } else {
                    alert("Something went wrong");

                }
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
                // alert("Something went wrong");
                alert(error);
            });

        } else {
            {
                var error = ""
                if (rowDetails.EmployeeName == "") error += "Username "
                if (rowDetails.EmployeeEmail == "") error += "Email "
                if (rowDetails.EmployeePassword == "") error += "Password "
                if (rowDetails.EmployeeIsAdmin == "") error += "Admin Level "
                if (rowDetails.EmployeeIsAdmin < 0 && rowDetails.EmployeeIsAdmin > 2) error += "Admin Level Issue"
                console.log("Required not Full Filled")
                alert(error)
            }
        }
    }

    const deleteUserData = (rowDetails) => {

        console.log(rowDetails)
        console.log("EmployeeId: " + rowDetails.EmployeeId)
        console.log("/admin/deleteUserInfo")

        Api({
            method: 'post',
            url: '/admin/deleteUserInfo',
            data: {
                EmployeeId: rowDetails.EmployeeId,
            }
        }).then(response => {
            if (response.data.success == 1) {
                fetchTableData()
                alert("Success")
            } else {
                alert(response.data.message);

            }
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });

    }

    const fetchTableData = () => {

        console.log("/admin/showAllUsers");
        Api({
            method: 'post',
            url: '/admin/showAllUsers',
            data: {
                // EmployeeId: "4"
                // EmployeeId: localStorage.getItem('isLoggedIn')
            }
        }).then(response => {
            if (response.data.success == 1) {
                setTableData([]);
                setTableData(response.data.data)

            } else {
                alert("Something went wrong");
            }

            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });
    }

    useEffect(() => {

        fetchTableData()

    }, []);


    return (
        <div className="Table">
            {/* <h1 align="center">React-app</h1>
      <h2 align="center">Material-table</h2> */}

            <MaterialTable columns={columns} data={tableData} title="User Information"

                // {
                //     ...isAdmin === "2" ? {
                //         editable={}
                //     } : null
                // }

                editable={

                    {
                        ...isAdmin === "2" ? {
                            onRowAdd: (newRow) => new Promise((reslove, reject) => {
                                if (newRow.name != null && newRow.phone != null) {
                                    setTableData([...tableData, newRow])
                                    reslove()
                                } else {
                                    console.log("Field required")
                                    reject()
                                }
                            }),
                            onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
                                // const updatedData = [...tableData]
                                // updatedData[oldRow.tableData.id] = newRow
                                // setTableData(updatedData)
                                editUserData(newRow)
                                reslove()
                            }),
                            onRowDelete: (selectedRow) => new Promise((reslove, reject) => {
                                // const updatedData = [...tableData]
                                // updatedData.splice(selectedRow.tableData.id, 1)
                                // setTableData(updatedData)
                                deleteUserData(selectedRow)
                                reslove()
                            })
                        } : {
                            ...isAdmin === "1" ? {
                                onRowAdd: (newRow) => new Promise((reslove, reject) => {
                                    if (newRow.name != null && newRow.phone != null) {
                                        setTableData([...tableData, newRow])
                                        reslove()
                                    } else {
                                        console.log("Field required")
                                        reject()
                                    }
                                }),
                                onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
                                    const updatedData = [...tableData]
                                    updatedData[oldRow.tableData.id] = newRow
                                    setTableData(updatedData)
                                    reslove()
                                })

                            } : null
                        }
                    }



                }

                onSelectionChange={(rows) => {
                    console.log(rows);
                    setSelectedRows(rows);
                }}

                actions={[
                    {
                        icon: 'download',
                        tooltip: "export data",
                        onClick: (e, data) => {
                            console.log(data);
                            customRowExport()
                        },
                    }
                ]}

                options={{
                    sorting: true, search: true, searchFieldAlignment: "right", searchAutoFocus: false, searchFieldVariant: "standard",
                    filtering: false, emptyRowsWhenPaging: false,
                    paging: true, pageSizeOptions: [10, 20, 50, 100], pageSize: 10, paginationType: "stepped", paginationPosition: "top",
                    showFirstLastPageButtons: true,
                    exportButton: true, exportAllData: true,
                    addRowPosition: "first", actionsColumnIndex: -1,
                    selection: true, showSelectAllCheckbox: true, selectionProps: rowData => ({
                        color: "primary"
                    }),
                    grouping: false,
                    columnsButton: true,
                    rowStyle: (data, index) => index % 2 == 0 ? { background: null, wordWrap: 'break-word', } : { background: "#EEFEFF", wordWrap: 'break-word', },
                    headerStyle: {
                        position: "sticky",
                        top: "0",
                        fontSize: "1.1rem",
                        fontWeight: "500",
                        width: "0rem",
                        paddingLeft: "0px",
                        paddingRight: "0px",
                        backgroundColor: "#ADEFD1FF",
                        //backgroundColor: "#039be5",
                    },
                    maxBodyHeight: "70vh",
                    tableLayout: "fixed",
                }}
            />
        </div>
    );
}


export default Users;
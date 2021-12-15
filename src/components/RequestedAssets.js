import { Cancel, Check, Height } from '@material-ui/icons';
import MaterialTable from 'material-table'
import { useState, useEffect } from 'react';
import Api from '../API';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { CsvBuilder } from 'filefy';

function RequestedAssets() {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
    const [isAccept, setIsAccept] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const [tableData, setTableData] = useState([
        { CategoryId: "1", AssetId: "1", AssetName: "Asus VivoBook 15", AssetDetails: "siam", EmployeeId: "1", },
        // { CategoryId: "3", AssetId: "2", AssetName: "Bashundhara Tissue", EmployeeId: "1", EmployeeName: "siam" },
        // { CategoryId: "8", AssetId: "4", AssetName: "PBS notebook", EmployeeId: "5", EmployeeName: "maruf" },
        // { CategoryId: "4", AssetId: "5", AssetName: "Ispahani Tea", EmployeeId: "8", EmployeeName: "allUser" },
        // { CategoryId: "1", AssetId: "6", AssetName: "Asus VivoBook 15", EmployeeId: "4", EmployeeName: "anas" },

    ])

    const columns = [
        {
            title: "AssetId", field: "AssetId", emptyValue: () => <em>null</em>, filtering: false, defaultSort: "asc",
            headerStyle: { pointerEvents: "none", textAlign: "left", }
        },
        {
            title: "CategoryId", field: "CategoryId", emptyValue: () => <em>null</em>, filtering: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: "AssetName", field: "AssetName", emptyValue: () => <em>null</em>, filtering: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: "EmployeeId", field: "EmployeeId", emptyValue: () => <em>null</em>, filtering: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: "AssetDetails", field: "AssetDetails", emptyValue: () => <em>null</em>, filtering: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: "Request Type", field: "Request", emptyValue: () => <em>null</em>, filtering: true, lookup: { "1": "Adding", "2": "Returning" },
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
    ]


    // Accept Return asset
    const returnRequestAccept = (data) => {

        const assetId = data.AssetId;
        const emplyoeeId = JSON.parse(localStorage.getItem('userDetails')).EmployeeId;
        const request = data.Request;
        const catagoryId = data.CategoryId;
        const responseRequest = 1;

        console.log("AssetId: " + assetId + ", catagoryId: " + catagoryId + ", responseRequest: "
            + responseRequest + ", request: " + request + ", emplyoeeId: " + emplyoeeId)

        Api({
            method: 'post',
            url: '/admin/approveReturnRequest',
            data: {
                AssetId: assetId,
                Request: request,
                CatagoryId: catagoryId,
                ResponseRequest: responseRequest,
                EmployeeId: emplyoeeId
            }
        }).then(response => {
            if (response.data.success == 1) {
                // setTableData(response.data.data)
                fetchTableData()
            } else {


            }

            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });


        //load the following data after the response
        // console.log("fetching table data");
        // fetchTableData();
    }


    // Accept Request asset
    const removeRequestAccept = (data) => {

        const assetId = data.AssetId;
        const emplyoeeId = JSON.parse(localStorage.getItem('userDetails')).EmployeeId;
        const request = data.Request;
        const catagoryId = data.CategoryId;
        const responseRequest = 1;

        console.log("AssetId: " + assetId + ", catagoryId: " + catagoryId + ", responseRequest: "
                     + responseRequest + ", request: " + request + ", emplyoeeId: " + emplyoeeId)

        Api({
            method: 'post',
            url: '/admin/approveAddRequest',
            data: {
                AssetId: assetId,
                Request: request,
                CatagoryId: catagoryId,
                ResponseRequest: responseRequest,
                EmployeeId: emplyoeeId
            }
        }).then(response => {
            if (response.data.success == 1) {
                // setTableData(response.data.data)
                fetchTableData()
            } else {


            }

            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });


        //load the following data after the response
        // console.log("fetching table data");
        // fetchTableData();
    }






    // Reject Return asset
    const returnRequestReject = (data) => {

        const assetId = data.AssetId;
        const emplyoeeId = JSON.parse(localStorage.getItem('userDetails')).EmployeeId;
        const request = data.Request;
        var responseRequest = 0;

        console.log("AssetId: " + assetId + ", EmplyoeeId: " + emplyoeeId + ", isAccept: " + responseRequest + ", request: " + request);

        Api({
            method: 'post',
            url: '/admin/denyReturnRequest',
            data: {
                AssetId: assetId,
                Request: request,
                // EmployeeId: emplyoeeId,
                ResponseRequest: responseRequest
            }
        }).then(response => {
            if (response.data.success == 1) {
                // setTableData(response.data.data)
                fetchTableData()
            } else {


            }

            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });


        //load the following data after the response
        // console.log("fetching table data");
        // fetchTableData();
    }

    // Reject Remove asset
    const removeRequestReject = (data) => {

        const assetId = data.AssetId;
        const emplyoeeId = JSON.parse(localStorage.getItem('userDetails')).EmployeeId;
        const request = data.Request;
        var responseRequest = 0;

        console.log("AssetId: " + assetId + ", EmplyoeeId: " + emplyoeeId + ", ResponseRequest: " + responseRequest + ", request: " + request);

        Api({
            method: 'post',
            url: '/admin/denyAddRequest',
            data: {
                AssetId: assetId,
                Request: request,
                // EmployeeId: emplyoeeId,
                ResponseRequest: isAccept
            }
        }).then(response => {
            if (response.data.success == 1) {
                // setTableData(response.data.data)
                fetchTableData()
            } else {


            }

            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });


        //load the following data after the response
        // fetchTableData();
    }



    // custom export data in CSV
    const customRowExport = () => {

        new CsvBuilder("Available Assetes Information.csv")
            .setColumns(columns.map(col => col.title))
            .addRows(selectedRows.map(rowData => columns.map(col => rowData[col.field])))
            .exportFile();

    }

    // fetch table Data
    const fetchTableData = () => {
        setTableData([]);
        console.log("/admin/showAllRequests")
        Api({
            method: 'post',
            url: '/admin/showAllRequests',
            data: {

            }
        }).then(response => {
            if (response.data.success == 1) {
                setTableData(response.data.data)
            } else {
                alert("something went wrong")
            }

            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });
    }


    useEffect(() => {
        //setId(APIIDData());

        setTableData([])
        console.log("/assets/availableAssets");
        console.log("EmployeeId: " + JSON.parse(localStorage.getItem('userDetails')).EmployeeId);

        fetchTableData();

    }, []);


    return (
        <div className="Table">
            {/* <h1 align="center">React-app</h1>
      <h2 align="center">Material-table</h2> */}

            <MaterialTable columns={columns} data={tableData} title="Requested Assets Information"
                editable={
                    {
                        // ...isAdmin === "2" ? {
                        //     onRowAdd: (newRow) => new Promise((reslove, reject) => {
                        //         if (newRow.name != null && newRow.phone != null) {
                        //             setTableData([...tableData, newRow])
                        //             reslove()
                        //         } else {
                        //             console.log("Field required")
                        //             reject()
                        //         }
                        //     }),
                        //     onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
                        //         const updatedData = [...tableData]
                        //         updatedData[oldRow.tableData.id] = newRow
                        //         setTableData(updatedData)
                        //         reslove()
                        //     }),
                        //     onRowDelete: (selectedRow) => new Promise((reslove, reject) => {
                        //         const updatedData = [...tableData]
                        //         updatedData.splice(selectedRow.tableData.id, 1)
                        //         setTableData(updatedData)
                        //         reslove()
                        //     })
                        // } : {
                        //     ...isAdmin === "1" ? {
                        //         onRowAdd: (newRow) => new Promise((reslove, reject) => {
                        //             if (newRow.name != null && newRow.phone != null) {
                        //                 setTableData([...tableData, newRow])
                        //                 reslove()
                        //             } else {
                        //                 console.log("Field required")
                        //                 reject()
                        //             }
                        //         }),
                        //         onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
                        //             const updatedData = [...tableData]
                        //             updatedData[oldRow.tableData.id] = newRow
                        //             setTableData(updatedData)
                        //             reslove()
                        //         })
                        //     } : null
                        // }
                    }
                }

                onSelectionChange={(rows) => {
                    console.log(rows);
                    setSelectedRows(rows);
                }}

                actions={[
                    {
                        icon: () => <Check />,
                        tooltip: "Approve",
                        onClick: (e, data) => {
                            if (window.confirm('Are you sure you wish to "Approve" this item?')){
                            setIsAccept(true);
                            if (data.Request == "2") {
                                returnRequestAccept(data);
                            } else {
                                removeRequestAccept(data);
                            }
                            console.log(data);
                            console.log(JSON.stringify(data.Request))
                            }
                        },
                        position: "row",
                        selection: "toolbarOnSelect"
                    },
                    {
                        icon: () => <Cancel />,
                        tooltip: "Reject",
                        onClick: (e, data) => {
                            setIsAccept(false);
                            if (data.Request == "2") {
                                returnRequestReject(data);
                            } else {
                                removeRequestReject(data);
                            }
                            console.log(data);
                            console.log(JSON.stringify(data.Request))
                        },
                        position: "row",
                        selection: "toolbarOnSelect"
                    },
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
                    rowStyle: (data, index) => index % 2 == 0 ? { background: null, wordWrap: 'break-word', } : {background: "#EEFEFF", wordWrap: 'break-word',},
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

export default RequestedAssets;

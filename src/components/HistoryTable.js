import MaterialTable from 'material-table'
import { useState, useEffect } from 'react';
import Api from '../API';
import { CsvBuilder } from 'filefy';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { Replay } from '@material-ui/icons';

function MyAssets() {

    const [tableData, setTableData] = useState([
        // { AssetId: "Maruf", AssetName: "asd@gmail.com", EmployeeId: "012345", UsageStart: "Male", IsOkay: "Dhaka", AssetDetails: "Asset details" },
        {
            "HistoryId": 28,
            "HistoryDate": "2021-10-26T18:00:00.000Z",
            "CategoryId": 10,
            "CategoryName": "Pen",
            "AssetExpired": 0,
            "AssetUsed": 0,
            "AssetQuantity": 0
        }
        // { name: "Hasan", email: "qwe@gmail.com", phone: "345", age: 15, gender: "Female", city: "CTG", cost: 1234 },
        // { name: "Shakil", email: "zxc@gmail.com", phone: "012", age: 55, gender: "Male", city: "Sylhet", cost: 1234 },
        // { name: "MHS", email: "mhs@gmail.com", phone: "123", age: null, gender: "Male", city: "Raj", cost: 1234 },
        // { name: "Maruf", email: "asd@gmail.com", phone: "012345", age: 25, gender: "Male", city: "Dhaka", cost: 1234 },
        // { name: "Hasan", email: "qwe@gmail.com", phone: "345", age: 15, gender: "Female", city: "CTG", cost: 1234 },
        // { name: "Shakil", email: "zxc@gmail.com", phone: "012", age: 55, gender: "Male", city: "Sylhet", cost: 1234 },
        // { name: "MHS", email: "mhs@gmail.com", phone: "123", age: null, gender: "Male", city: "Raj", cost: 1234 },
    ])

    const columns = [
        // { title: "Employee Id", field: "EmployeeId", emptyValue: () => <em>null</em>, filtering: false },
        {
            title: "CategoryName", field: "CategoryName", emptyValue: () => <em>null</em>, defaultSort: "asc", filtering: false, editable: false,
            headerStyle: { pointerEvents: "none", paddingLeft: "15px", textAlign: "left", },
        },
        {
            title: "History Date", field: "HistoryDate", emptyValue: () => <em>null</em>, filtering: false, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px",},
        },
        {
            title: "Asset Quantity", field: "AssetQuantity", emptyValue: () => <em>null</em>, filtering: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: "Asset Used", field: "AssetUsed", emptyValue: () => <em>null</em>, filtering: false, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: "Asset Expired", field: "AssetExpired", emptyValue: () => <em>null</em>, filtering: false, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        // {
        //     title: "Comments", field: "Comments", emptyValue: () => <em>null</em>, filtering: false,
        //     headerStyle: { textAlign: "left", },
        // },
        // { title: "AssetDetails", field: "AssetDetails", emptyValue: () => <em>null</em>, type: "currency", currencySetting: { currencyCode: "BDT", minimumFractionDigit: 2 }, filtering: false },
    ]

    const [selectedRows, setSelectedRows] = useState([]);


    const editTableData = (rowDetails) => {
        console.log(rowDetails)
        const assetId = rowDetails.AssetId

        const assetName = rowDetails.AssetName
        const assetDetails = rowDetails.AssetDetails
        const comments = rowDetails.Comments
        const isOkay = rowDetails.IsOkay

        console.log(assetName + " " + assetDetails + " " + comments + " " + isOkay + " ")

        console.log("AssetId: " + assetId)
        console.log("/activity/showHistoryTable")
        Api({
            method: 'post',
            url: '/admin/editIndividualAsset',
            data: {
                AssetId: assetId,
                AssetName: assetName,
                AssetDetails: assetDetails,
                Comments: comments,
                IsOkay: isOkay,

            }
        }).then(response => {
            if (response.data.success == 1) {
                alert("Edited Successfully")
                fetchTableData()
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

    // custom export data in CSV
    const customRowExport = () => {

        new CsvBuilder("My Assetes Information.csv")
            .setColumns(columns.map(col => col.title))
            .addRows(selectedRows.map(rowData => columns.map(col => rowData[col.field])))
            .exportFile();

    }


    // adding asset to my account
    const returnFromMyslef = (data) => {

        const assetId = data.AssetId;
        const identifiable = data.IsIdentifiable;
        const emplyoeeId = JSON.parse(localStorage.getItem('userDetails')).EmployeeId;

        console.log("AssetId: " + assetId + ", EmplyoeeId: " + emplyoeeId + ", identifiable: " + identifiable);

        Api({
            method: 'post',
            url: '/assets/returnUserAsset',
            data: {
                AssetId: assetId,
                EmployeeId: emplyoeeId,
                IsIdentifiable: identifiable
            }
        }).then(response => {
            if (response.data.success == 1) {
                // setTableData(response.data.data)
                fetchTableData()
            } else {
                alert("Something went wrong");
            }

            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });


        //load the following data after the response
        console.log("fetching table data");
        fetchTableData();

    }

    // fetch table Data
    const fetchTableData = () => {
        console.log("/activity/showHistoryTable")
        Api({
            method: 'post',
            url: '/activity/showHistoryTable',
            data: {
                // EmployeeId: "4"
                // EmployeeId: JSON.parse(localStorage.getItem('userDetails')).EmployeeId
            }
        }).then(response => {
            if (response.data.success === 1) {
                setTableData([])
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

    const monthlyCheck = () => {

    }

    const resetUsedAsset = () => {

    }


    useEffect(() => {
        //setId(APIIDData());

        fetchTableData();


    }, []);





    return (
        <div className="Table">
            {/* <h1 align="center">React-app</h1>
      <h2 align="center">Material-table</h2> */}

            <MaterialTable columns={columns} data={tableData} title="History Records"
                // editable={{
                //   // onRowAdd: (newRow) => new Promise((reslove, reject) => {
                //   //   if (newRow.name != null && newRow.phone != null) {
                //   //     setTableData([...tableData, newRow])
                //   //     reslove()
                //   //   } else {
                //   //     console.log("Field required")
                //   //     reject()
                //   //   }
                //   // }),
                //   // {isAdmin === "true" ? : null}
                //   // onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
                //   //   const updatedData = [...tableData]
                //   //   updatedData[oldRow.tableData.id] = newRow
                //   //   setTableData(updatedData)
                //   //   reslove()
                //   // }),
                //   // onRowDelete: (selectedRow) => new Promise((reslove, reject) => {
                //   //   const updatedData = [...tableData]
                //   //   updatedData.splice(selectedRow.tableData.id, 1)
                //   //   setTableData(updatedData)
                //   //   reslove()
                //   // })
                //   onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
                //     // const updatedData = [...tableData]
                //     // updatedData[oldRow.tableData.id] = newRow
                //     // setTableData(updatedData)
                //     editTableData(newRow)
                //     reslove()
                //   }),
                // }}

                onSelectionChange={(rows) => {
                    console.log(rows);
                    setSelectedRows(rows);
                }}

                // actions={[
                //   {
                //     icon: () => <Replay />,
                //     tooltip: "Return",
                //     onClick: (e, data) => {
                //       returnFromMyslef(data);
                //       console.log(data);
                //     },
                //     position: "row",
                //     selection: "toolbarOnSelect"
                //   },
                //   {
                //     icon: 'download',
                //     tooltip: "export data",
                //     onClick: (e, data) => {
                //       console.log(data);
                //       customRowExport()
                //     },
                //   },
                //   {
                //     icon: 'check',
                //     tooltip: "Monthly check",
                //     onClick: (e, data) => {
                //       console.log(data);
                //       // customRowExport()
                //     },
                //     position: "toolbar"
                //   }
                // ]}

                options={{
                    sorting: true, search: true, searchFieldAlignment: "right", searchAutoFocus: false, searchFieldVariant: "standard",
                    filtering: false, emptyRowsWhenPaging: false,
                    paging: true, pageSizeOptions: [10, 20, 50, 100], pageSize: 10, paginationType: "stepped", paginationPosition: "top",
                    showFirstLastPageButtons: true,
                    exportButton: true, exportAllData: true,
                    addRowPosition: "first", actionsColumnIndex: -1,
                    selection: false, showSelectAllCheckbox: true, selectionProps: rowData => ({
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
                    maxBodyHeight: "65vh",

                    tableLayout: "fixed",
                    // rowStyle: {
                    //   wordWrap: 'break-word',
                    // },
                    // cellStyle: {
                    //   width: 20,
                    //   maxWidth: 20
                    // }
                    // editCellStyle: {
                    //   maxWidth: 5,
                    //   wordBreak: "break-word",
                    //   whiteSpace: 'normal',
                    //   wordWrap: 'break-word'
                    // }
                }}
            />
        </div>
    );
}

export default MyAssets;

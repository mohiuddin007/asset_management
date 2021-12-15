import { Height } from '@material-ui/icons';
import MaterialTable from 'material-table'
import { useState, useEffect } from 'react';
import Api from '../API';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { CsvBuilder } from 'filefy';

function Activities() {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
    const [selectedRows, setSelectedRows] = useState([])

    const [tableData, setTableData] = useState([
        // { CategoryId: "1", AssetId: "1", AssetName: "Asus VivoBook 15", EmployeeId: "1", EmployeeName: "siam" },
        {
            ActivityId: "1",
            ActivityTime: "1",
            ActivityType: "Asus VivoBook 15",
            AssetId: "1",
            AssetName: "2021-10-07T01:24:28.000Z",
            EmployeeId: "4",
            EmployeeName: "1",
        },
        // { CategoryId: "3", AssetId: "2", AssetName: "Bashundhara Tissue", EmployeeId: "1", EmployeeName: "siam" },
        // { CategoryId: "8", AssetId: "4", AssetName: "PBS notebook", EmployeeId: "5", EmployeeName: "maruf" },
        // { CategoryId: "4", AssetId: "5", AssetName: "Ispahani Tea", EmployeeId: "8", EmployeeName: "allUser" },
        // { CategoryId: "1", AssetId: "6", AssetName: "Asus VivoBook 15", EmployeeId: "4", EmployeeName: "anas" },

    ])

    const columns = [
        {
            title: "ActivityId", field: "ActivityId", emptyValue: () => <em>null</em>, filtering: false, defaultSort: "asc",
            headerStyle: { pointerEvents: "none", textAlign: "left", }
        },
        {
            title: "AssetId", field: "AssetId", emptyValue: () => <em>null</em>, filtering: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: "ActivityTime", field: "ActivityTime", emptyValue: () => <em>null</em>, defaultSort: "asc", filtering: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: "ActivityType", field: "ActivityType", emptyValue: () => <em>null</em>, filtering: false,
            lookup: { 0: "test", 1: "Assigned", 2: "Returned", 3: "Added", 4: "Expired" },
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: "AssetName", field: "AssetName", emptyValue: () => <em>null</em>, filtering: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: "EmployeeId", field: "EmployeeId", emptyValue: () => <em>null</em>, filtering: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: "EmployeeName", field: "EmployeeName", emptyValue: () => <em>null</em>, filtering: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
    ]


    // custom export data in CSV
    const customRowExport = () => {

        new CsvBuilder("All Assetes Information.csv")
            .setColumns(columns.map(col => col.title))
            .addRows(selectedRows.map(rowData => columns.map(col => rowData[col.field])))
            .exportFile();

    }

    const fetchTableData = () => {
        setTableData([])
        console.log("/activity/showActivityTable");
        Api({
            method: 'post',
            url: '/activity/showActivityTable',
            data: {

            }
        }).then(response => {
            if (response.data.success == 1) {
                setTableData(response.data.data)
            } else {


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
        fetchTableData()



    }, []);


    return (
        <div className="Table">
            {/* <h1 align="center">React-app</h1>
      <h2 align="center">Material-table</h2> */}

            <MaterialTable columns={columns} data={tableData} title="Activity Information"
                // editable={
                //     {
                //         ...isAdmin === "2" ? {
                //             onRowAdd: (newRow) => new Promise((reslove, reject) => {
                //                 if (newRow.name != null && newRow.phone != null) {
                //                     setTableData([...tableData, newRow])
                //                     reslove()
                //                 } else {
                //                     console.log("Field required")
                //                     reject()
                //                 }
                //             }),
                //             onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
                //                 const updatedData = [...tableData]
                //                 updatedData[oldRow.tableData.id] = newRow
                //                 setTableData(updatedData)
                //                 reslove()
                //             }),
                //             onRowDelete: (selectedRow) => new Promise((reslove, reject) => {
                //                 const updatedData = [...tableData]
                //                 updatedData.splice(selectedRow.tableData.id, 1)
                //                 setTableData(updatedData)
                //                 reslove()
                //             })
                //         } : {
                //             ...isAdmin === "1" ? {
                //                 onRowAdd: (newRow) => new Promise((reslove, reject) => {
                //                     if (newRow.name != null && newRow.phone != null) {
                //                         setTableData([...tableData, newRow])
                //                         reslove()
                //                     } else {
                //                         console.log("Field required")
                //                         reject()
                //                     }
                //                 }),
                //                 onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
                //                     const updatedData = [...tableData]
                //                     updatedData[oldRow.tableData.id] = newRow
                //                     setTableData(updatedData)
                //                     reslove()
                //                 })
                //             } : null
                //         }
                //     }
                // }

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

export default Activities;

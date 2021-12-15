import { Height } from '@material-ui/icons';
import MaterialTable from 'material-table'
import { useState, useEffect } from 'react';
import Api from '../API';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { CsvBuilder } from 'filefy';

function AllAssets() {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
    const [selectedRows, setSelectedRows] = useState([])

    const [tableData, setTableData] = useState([
        // { CategoryId: "1", AssetId: "1", AssetName: "Asus VivoBook 15", EmployeeId: "1", EmployeeName: "siam" },
        {
            AssetId: "1",
            CategoryId: "1",
            AssetName: "Asus VivoBook 15",
            EmployeeId: "1",
            UsageStart: "2021-10-07T01:24:28.000Z",
            UsageEnd: null,
            IsOkay: "1",
            Comments: "",
            AssetDetails: "OS-windows S/n: M8N0CV12M541335\t\t\t\t\tCG609197Z",
            IsAvailable: "0",
            IsChecked: "0",
            UsedQuantity: "0",
            Request: "2"
        },
        // { CategoryId: "3", AssetId: "2", AssetName: "Bashundhara Tissue", EmployeeId: "1", EmployeeName: "siam" },
        // { CategoryId: "8", AssetId: "4", AssetName: "PBS notebook", EmployeeId: "5", EmployeeName: "maruf" },
        // { CategoryId: "4", AssetId: "5", AssetName: "Ispahani Tea", EmployeeId: "8", EmployeeName: "allUser" },
        // { CategoryId: "1", AssetId: "6", AssetName: "Asus VivoBook 15", EmployeeId: "4", EmployeeName: "anas" },

    ])

    const columns = [
        { title: "AssetId", field: "AssetId", emptyValue: () => <em>null</em>, filtering: false, defaultSort: "asc" },
        { title: "CategoryId", field: "CategoryId", emptyValue: () => <em>null</em>, defaultSort: "asc", filtering: false },
        { title: "AssetName", field: "AssetName", emptyValue: () => <em>null</em>, filtering: false },
        { title: "EmployeeId", field: "EmployeeId", emptyValue: () => <em>null</em>, filtering: false },
        { title: "EmployeeName", field: "EmployeeName", emptyValue: () => <em>null</em>, filtering: true },
        { title: "UsageStart", field: "UsageStart", emptyValue: () => <em>null</em>, filtering: true },
        { title: "IsOkay", field: "IsOkay", emptyValue: () => <em>null</em>, filtering: true },
        { title: "IsAvailable", field: "IsAvailable", emptyValue: () => <em>null</em>, filtering: true },
        { title: "UsedQuantity", field: "UsedQuantity", emptyValue: () => <em>null</em>, filtering: true },
    ]


    // custom export data in CSV
    const customRowExport = () => {

        new CsvBuilder("All Assetes Information.csv")
            .setColumns(columns.map(col => col.title))
            .addRows(selectedRows.map(rowData => columns.map(col => rowData[col.field])))
            .exportFile();

    }


    useEffect(() => {
        //setId(APIIDData());

        setTableData([])
        console.log("/admin/showAllAssets");
        console.log("EmployeeId: " + JSON.parse(localStorage.getItem('userDetails')).EmployeeId);
        Api({
            method: 'post',
            url: '/admin/showAllAssets',
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


    }, []);


    return (
        <div className="Table">
            {/* <h1 align="center">React-app</h1>
      <h2 align="center">Material-table</h2> */}

            <MaterialTable columns={columns} data={tableData} title="All Assetes Information"
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
                                const updatedData = [...tableData]
                                updatedData[oldRow.tableData.id] = newRow
                                setTableData(updatedData)
                                reslove()
                            }),
                            onRowDelete: (selectedRow) => new Promise((reslove, reject) => {
                                const updatedData = [...tableData]
                                updatedData.splice(selectedRow.tableData.id, 1)
                                setTableData(updatedData)
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
                    paging: true, pageSizeOptions: [5, 10, 20, 50, 100], pageSize: 5, paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "bottom",
                    exportButton: true, exportAllData: true,
                    addRowPosition: "first", actionsColumnIndex: -1,
                    selection: true, showSelectAllCheckbox: true, selectionProps: rowData => ({
                        color: "primary"
                    }),
                    grouping: false,
                    columnsButton: true,
                    rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null
                }}
            />
        </div>
    );
}

export default AllAssets;

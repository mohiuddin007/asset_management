import { Height } from '@material-ui/icons';
import MaterialTable from 'material-table'
import { useState, useEffect } from 'react';
import Api from '../API';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { CsvBuilder } from 'filefy';
import CategoryDetailsTable from './CategoryDetailsTable';

function AllAsset() {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
    const [selectedRows, setSelectedRows] = useState([])
    const [category, setCategory] = useState()

    const [tableData, setTableData] = useState([
        // { CategoryId: "1", AssetId: "1", AssetName: "Asus VivoBook 15", EmployeeId: "1", EmployeeName: "siam" },
        {
            CategoryId: "1",
            CategoryName: "laptop",
            AssetQuantity: "16",
            AssetUsed: "6",
            AssetExpired: "3"
        },
        // { CategoryId: "3", AssetId: "2", AssetName: "Bashundhara Tissue", EmployeeId: "1", EmployeeName: "siam" },
        // { CategoryId: "8", AssetId: "4", AssetName: "PBS notebook", EmployeeId: "5", EmployeeName: "maruf" },
        // { CategoryId: "4", AssetId: "5", AssetName: "Ispahani Tea", EmployeeId: "8", EmployeeName: "allUser" },
        // { CategoryId: "1", AssetId: "6", AssetName: "Asus VivoBook 15", EmployeeId: "4", EmployeeName: "anas" },

    ])

    const columns = [
        {
            title: "CategoryId", field: "CategoryId", emptyValue: () => <em>null</em>, sorting: true, filtering: false, editable: false,
            headerStyle: { pointerEvents: "none", textAlign: "left", },
        },
        {
            title: "CategoryName", field: "CategoryName", emptyValue: () => <em>null</em>, filtering: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: "AssetQuantity", field: "AssetQuantity", emptyValue: () => <em>null</em>, filtering: false, editable: false,
            render: rowData => {
                return rowData.WarningFlag == 0 ? <p style={{ color: "#9CC094", }}>{rowData.AssetQuantity}</p> :
                    <div style={{ background: "#FDD2BF", color: "#8E0505", fontWeight: "bold", width: "fit-content", padding:"4px 20px 4px 20px", }}>{rowData.AssetQuantity}</div>
            },
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: "AssetUsed", field: "AssetUsed", emptyValue: () => <em>null</em>, filtering: true, editable: false, headerStyle: (rowData) => {
                return rowData.WarningFlag == 0 ? { background: "#9CC094" } : { background: "#E02401" }
            }, textAlign: "left", paddingLeft: "15px",
        },
        {
            title: "AssetExpired", field: "AssetExpired", emptyValue: () => <em>null</em>, filtering: true, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: "WarningFlag", field: "WarningFlag", emptyValue: () => <em>null</em>, defaultSort: "desc", filtering: true, hidden: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: "Quantity", field: "Quantity", emptyValue: () => <em>null</em>, filtering: true, hidden: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },

        },
        {
            title: "WarningQuantity", field: "WarningQuantity", emptyValue: () => <em>null</em>, filtering: true,
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

    const selectedCategory = (categoryId) => {
        // alert(index)
        console.log(categoryId)
        setCategory()
        setCategory(categoryId)
        showDynamicTable()
    }


    useEffect(() => {
        //setId(APIIDData());

        console.log("/admin/showAllAssetCategory");
        console.log("EmployeeId: " + JSON.parse(localStorage.getItem('userDetails')).EmployeeId);
        Api({
            method: 'post',
            url: '/admin/showAllAssetCategory',
            data: {

            }
        }).then(response => {
            if (response.data.success == 1) {
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


    }, []);



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const showDynamicTable = () => {
        console.log("Add new Clicked");
        console.log(addModalOpen);
        setAddModalOpen(true);
        console.log(isModalOpen);
    }
    const closeDynamicTable = () => {
        setAddModalOpen(false);
    }


    return (
        <div className="Table">
            {/* <h1 align="center">React-app</h1>
      <h2 align="center">Material-table</h2> */}

            <MaterialTable columns={columns} data={tableData} title="All Assets Information"
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

                onRowClick={(e, rowData) => selectedCategory(rowData.CategoryId)}

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
                    rowStyle: (data, index) => data.WarningFlag == 1 ? { background: null } : index % 2 === 0 ? { background: null, wordWrap: 'break-word', } : { background: "#EEFEFF", wordWrap: 'break-word', },
                    // rowStyle: (data, index) => data.WarningFlag == 1 ? { background: "#FDD2BF" } : index % 2 === 0 ? { background: null, wordWrap: 'break-word', } : { background: "#EEFEFF", wordWrap: 'break-word', },
                    // rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
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
                }}
            />

            <div>
                <CategoryDetailsTable show={addModalOpen} onHide={closeDynamicTable} category={category}/>
            </div>
        </div>
    );
}

export default AllAsset;

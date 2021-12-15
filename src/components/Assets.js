import MaterialTable from 'material-table'
import { useState, useEffect } from 'react';
import Api from '../API';

function Assets() {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

    const [tableData, setTableData] = useState([
        { CategoryId: "1", AssetId: "1", AssetName: "Asus VivoBook 15", EmployeeId: "1", EmployeeName: "siam" },
        { CategoryId: "3", AssetId: "2", AssetName: "Bashundhara Tissue", EmployeeId: "1", EmployeeName: "siam" },
        { CategoryId: "8", AssetId: "4", AssetName: "PBS notebook", EmployeeId: "5", EmployeeName: "maruf" },
        { CategoryId: "4", AssetId: "5", AssetName: "Ispahani Tea", EmployeeId: "8", EmployeeName: "allUser" },
        { CategoryId: "1", AssetId: "6", AssetName: "Asus VivoBook 15", EmployeeId: "4", EmployeeName: "anas" },

    ])

    const columns = [
        { title: "AssetId", field: "AssetId", emptyValue: () => <em>null</em>, filtering: false },
        { title: "CategoryId", field: "CategoryId", emptyValue: () => <em>null</em>, defaultSort: "asc", filtering: false },
        { title: "AssetName", field: "AssetName", emptyValue: () => <em>null</em>, filtering: false },
        { title: "EmployeeId", field: "EmployeeId", emptyValue: () => <em>null</em>, filtering: false },
        { title: "EmployeeName", field: "EmployeeName", emptyValue: () => <em>null</em>, filtering: true },
    ]

    useEffect(() => {
        //setId(APIIDData());

        setTableData([])
        console.log("/assets/availableAssets");
        console.log("EmployeeId: " + JSON.parse(localStorage.getItem('userDetails')).EmployeeId);
        Api({
            method: 'post',
            url: '/assets/availableAssets',
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
                        } : { ...isAdmin ==="1" ? {
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
                        } : null}
                    }
                }

                onSelectionChange={(selectedRows) => console.log(selectedRows)}

                options={{
                    sorting: true, search: true, searchFieldAlignment: "right", searchAutoFocus: false, searchFieldVariant: "standard",
                    filtering: false,
                    paging: true, pageSizeOptions: [5, 10, 20, 50, 100], pageSize: 5, paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "bottom",
                    exportButton: true, exportAllData: true,
                    addRowPosition: "first", actionsColumnIndex: -1,
                    selection: false, showSelectAllCheckbox: true, selectionProps: rowData => ({
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

export default Assets;

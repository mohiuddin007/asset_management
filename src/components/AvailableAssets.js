import { Height } from '@material-ui/icons';
import MaterialTable from 'material-table'
import { useState, useEffect } from 'react';
import Api from '../API';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { CsvBuilder } from 'filefy';
import MyAssets from './MyAssets';
import { Modal } from 'bootstrap';

function AvailableAssets() {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
    const [selectedRows, setSelectedRows] = useState([]);

    const [tableData, setTableData] = useState([
        {
            CategoryId: "1", AssetId: "1", AssetName: "Asus VivoBook 15", EmployeeId: "1", EmployeeName: "siam",
            IsOkay: "0",
            AssetDetails: "",
            AssetNeedApproval: "0",
            IsIdentifiable: "0",
        },
        // { CategoryId: "3", AssetId: "2", AssetName: "Bashundhara Tissue", EmployeeId: "1", EmployeeName: "siam" },
        // { CategoryId: "8", AssetId: "4", AssetName: "PBS notebook", EmployeeId: "5", EmployeeName: "maruf" },
        // { CategoryId: "4", AssetId: "5", AssetName: "Ispahani Tea", EmployeeId: "8", EmployeeName: "allUser" },
        // { CategoryId: "1", AssetId: "6", AssetName: "Asus VivoBook 15", EmployeeId: "4", EmployeeName: "anas" },

    ])

    const columns = [
        {
            title: "AssetId", field: "AssetId", emptyValue: () => <em>null</em>, filtering: false, defaultSort: "asc",
            headerStyle: { pointerEvents: "none", textAlign: "left", },
        },
        {
            title: "CategoryId", field: "CategoryId", emptyValue: () => <em>null</em>, filtering: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: "AssetName", field: "AssetName", emptyValue: () => <em>null</em>, filtering: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }, 
        },
        {
            title: "AssetDetails", field: "AssetDetails", emptyValue: () => <em>null</em>, filtering: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
    ]


    // adding asset to my account
    const addToMyself = (data) => {

        const assetId = data.AssetId;
        const emplyoeeId = JSON.parse(localStorage.getItem('userDetails')).EmployeeId;
        const identifiable = data.IsIdentifiable;
        const categoryId = data.CategoryId;
        console.log(JSON.stringify(data))

        console.log("AssetId: " + assetId + ", EmplyoeeId: " + emplyoeeId + ", isIdentifiable: " + identifiable + ", categoryId: " + categoryId);

        Api({
            method: 'post',
            url: '/assets/requestUserAsset',
            data: {
                AssetId: assetId,
                EmployeeId: emplyoeeId,
                IsIdentifiable: identifiable,
                CategoryId: categoryId
            }
        }).then(response => {
            if (response.data.success == 1) {
                alert("Requested");
                console.log("fetching table data");
                fetchTableData();
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
        setTableData([])

        const emplyoeeId = JSON.parse(localStorage.getItem('userDetails')).EmployeeId;

        console.log("EmplyoeeId: " + emplyoeeId);

        console.log("/assets/availableAssets")
        Api({
            method: 'post',
            url: '/assets/availableAssets',
            data: {

            }
        }).then(response => {
            if (response.data.success === 1) {
                console.log("successss")
                console.log("DATA FETCH: " + response.data.data);
                setTableData(response.data.data)
            } else {
                // console.log("ORE BABA")


            }

            console.log(response.data.data);
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

            <MaterialTable
                // style={{maxHeight: "50px"}}
                columns={columns} data={tableData} title="Available Assets Information"
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
                        icon: () => <AddCircleOutlineSharpIcon />,
                        tooltip: "Add asset to Myself",
                        onClick: (e, data) => {
                            if (window.confirm('Are you sure you wish to "Add" this item?')){
                            // addToMyself(data);
                            // console.log(data);
                            }
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

                onRowClick={(e, rowData) => {
                    <>
                        <Modal
                            size="sg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Add new Asset
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <h2>test</h2>
                            </Modal.Body>


                            <Modal.Footer>
                                <button >Close</button>
                            </Modal.Footer>
                        </Modal>
                    </>
                }}

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

export default AvailableAssets;

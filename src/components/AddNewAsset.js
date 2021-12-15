import { TextField } from "@material-ui/core";
import { AddToQueueSharp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Modal, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import Api from '../API';
import Multiselect from 'multiselect-react-dropdown';

function AddNewAsset({ show, onHide }) {

    const [showAssetQuantity, setShowAssetQuantity] = useState(false)

    const [addNewAsset, setAddNewAsset] = useState({
        CategoryId: "", AssetName: "", Comments: "", AssetDetails: "", // AssetDetails means SerialNumber of asset
        IsIdentifiable: "", Quantity: "1"
    });

    const [categoryData, setCategoryData] = useState([])
    const [categoryId, setCategoryId] = useState()
    const [isIdentifiable, setIsIdentifiable] = useState()

    const [id, setId] = useState("");

    useEffect(() => {
        // setAddNewAsset({ CategoryId: "", AssetName: "", Comments: "", AssetDetails: "", IsIdentifiable: "" })
        getCategoryData()
    }, []);

    const getCategoryData = () => {
        console.log(addNewAsset)
        console.log("getting categoryList")
        console.log("/admin/showAllAssetCategory");
        console.log("EmployeeId: " + JSON.parse(localStorage.getItem('userDetails')).EmployeeId);
        Api({
            method: 'post',
            url: '/admin/showAllAssetCategory',
            data: {

            }
        }).then(response => {
            if (response.data.success == 1) {
                setCategoryData([])
                setCategoryData(response.data.data)
                // getCategoryList(response.data.data)
            } else {
                alert("Something went wrong");
            }

            console.log("response")
            console.log(response.data.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });
    }

    const selectedCategoryId = (selectedList, RemovedList) => {
        // {
        //     selectedList.toString() == "user" ? setNewUserDetails({...newUserDetails, EmployeeIsAdmin: 0}) : selectedList.toString() == "admin" ? setNewUserDetails({...newUserDetails, EmployeeIsAdmin: 2}) : setNewUserDetails({...newUserDetails, EmployeeIsAdmin: 1})
        // }
        // console.log({...newUserDetails, EmployeeIsAdmin: 0})

        console.log(selectedList[0])
        console.log(selectedList[0].CategoryId)

        console.log(selectedList[0].CategoryId)
        console.log(selectedList[0].IsIdentifiable)

        // setCategoryId(selectedList[0].CategoryId)
        // setIsIdentifiable(selectedList[0].IsIdentifiable)

        setAddNewAsset({ ...addNewAsset, CategoryId: selectedList[0].CategoryId, IsIdentifiable: selectedList[0].IsIdentifiable })
        console.log(addNewAsset)

    }

    const SubmitHandler = () => {
        //API call here
        // setAddNewAsset({...addNewAsset, CategoryId: categoryId, IsIdentifiable: isIdentifiable})

        console.log(addNewAsset)

        if (addNewAsset.CategoryId !== "" && addNewAsset.AssetName !== "" && addNewAsset.Comments !== "" &&
            addNewAsset.AssetDetails !== "" && addNewAsset.IsIdentifiable !== "" && (addNewAsset.IsIdentifiable >= 0 && addNewAsset.IsIdentifiable < 3)) {
            console.log("Required Filled")

            console.log(addNewAsset)
            Api({
                method: 'post',
                url: '/admin/addAsset',
                data: {
                    CategoryId: addNewAsset.CategoryId,
                    AssetName: addNewAsset.AssetName,
                    Comments: addNewAsset.Comments,
                    AssetDetails: addNewAsset.AssetDetails,
                    IsIdentifiable: addNewAsset.IsIdentifiable,
                }
            }).then(response => {
                if (response.data.success == 1) {
                    alert("Success");
                    onHide();
                } else {
                    alert("Error")

                }
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
                alert("Something went wrong");
                alert(error);
            });

        } else {
            if (addNewAsset.IsIdentifiable < 0 || addNewAsset.IsIdentifiable > 2) {
                console.log("Required not Full Filled")
                alert("Identifiable Value should be \"1\" or \"2\"")
            } else {
                console.log("Required not Full Filled")
                alert("All filled is required")
            }
        }
        console.log(addNewAsset);
    };

    const CancelHandler = () => {

    }

    return (
        <>
            <Modal
                show={show}
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

                    <Multiselect
                        isObject={true}
                        singleSelect={true}
                        options={categoryData}
                        displayValue="CategoryName"
                        // selectedValues={[`${categoryList[0].toString()}`]}
                        onRemove={function noRefCheck() { }}
                        onSearch={function noRefCheck() { }}
                        onSelect={selectedCategoryId}
                    // options={categoryList}
                    />

                    {/* <TextField label='Enter CategoryId' placeholder='Enter CategoryId' type='text' fullWidth required
                        onChange={e => setAddNewAsset({ ...addNewAsset, CategoryId: e.target.value })} value={addNewAsset.CategoryId} /> */}

                    <TextField label='Enter Asset Name' placeholder='Enter Asset Name' type='text' fullWidth required
                        onChange={e => setAddNewAsset({ ...addNewAsset, AssetName: e.target.value })} value={addNewAsset.AssetName} />

                    <TextField label='Enter Comments' placeholder='Enter Comments' type='text' fullWidth required
                        onChange={e => setAddNewAsset({ ...addNewAsset, Comments: e.target.value })} value={addNewAsset.Comments} />

                    <TextField label='Enter Asset Details' placeholder='Enter Asset Details' type='text' fullWidth required
                        onChange={e => setAddNewAsset({ ...addNewAsset, AssetDetails: e.target.value })} value={addNewAsset.AssetDetails} />

                    {/* <TextField label='Is Identifiable' placeholder='Is Identifiable (1 or 2)' type='text' fullWidth required
                        onChange={e => setAddNewAsset({ ...addNewAsset, IsIdentifiable: e.target.value })} value={addNewAsset.IsIdentifiable} /> */}

                    {
                        addNewAsset.IsIdentifiable == 0 ?
                            <TextField label='Quantity' placeholder='Quantity' type='text' fullWidth
                                onChange={e => setAddNewAsset({ ...addNewAsset, Quantity: e.target.value })} value={addNewAsset.Quantity} />
                            : null
                    }



                </Modal.Body>


                <Modal.Footer>
                    <button className="button" onClick={SubmitHandler}>Submit</button>
                    <button className="buttonClose" onClick={onHide}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewAsset;

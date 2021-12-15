import { TextField } from "@material-ui/core";
import { AddToQueueSharp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Modal, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import Api from '../API';
import Multiselect from 'multiselect-react-dropdown';

function AddNewCategory({ show, onHide }) {

    const [showAssetQuantity, setShowAssetQuantity] = useState(false)
    const [isIdentifiableList, setIsIdentifiableList] = useState(['Identifiable', 'Non-Identifiable', 'Global'])

    const [addNewCategory, setAddNewCategory] = useState({
        CategoryName: "", WarningQuantity: "5", IsIdentifiable: "0"
    });

    const [categoryData, setCategoryData] = useState([])
    const categoryList = []

    const [id, setId] = useState("");

    useEffect(() => {
        setAddNewCategory({ CategoryName: "", WarningQuantity: "5", IsIdentifiable: "0" })
        getCategoryData()
    }, []);

    const getCategoryData = () => {
        console.log(addNewCategory)
        console.log("getting categoryList")
        console.log("/admin/showAllAssetCategory");
        console.log("EmployeeId: " + JSON.parse(localStorage.getItem('userDetails')).EmployeeId);
        Api({
            method: 'post',
            url: '/admin/showAllAssetCategory',
            data: {
                CategoryName: addNewCategory.CategoryName,
                WarningQuantity: addNewCategory.WarningQuantity,
                IsIdentifiable: addNewCategory.IsIdentifiable,
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

        var categoryId = selectedList[0].CategoryId
        var isIdentifiable = selectedList[0].IsIdentifiable

        setAddNewCategory({ ...addNewCategory, CategoryId: categoryId })
        setAddNewCategory({ ...addNewCategory, IsIdentifiable: isIdentifiable })
        console.log(addNewCategory)

    }

    const SubmitHandler = () => {
        //API call here
        if (addNewCategory.CategoryName !== "" && addNewCategory.WarningQuantity > 0 && addNewCategory.IsIdentifiable !== "") {
            console.log("Required Filled")
            console.log(addNewCategory)
            console.log("/admin/addCategory")
            Api({
                method: 'post',
                url: '/admin/addCategory',
                data: {
                    CategoryId: addNewCategory.CategoryName,
                    AssetName: addNewCategory.WarningQuantity,
                    Comments: addNewCategory.IsIdentifiable,
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
            if (addNewCategory.IsIdentifiable < 0 || addNewCategory.IsIdentifiable > 2) {
                console.log("Required not Full Filled")
                alert("Identifiable Value should be \"1\" or \"2\"")
            } else {
                console.log("Required not Full Filled")
                alert("All filled is required")
            }
        }
        console.log(addNewCategory);
    };

    const selectedIdentifiableLevel = (selectedList, RemovedList) => {
        {
            selectedList.toString() == "Identifiable" ? setAddNewCategory({ ...addNewCategory, IsIdentifiable: "1" }) : selectedList.toString() == "Global" ? setAddNewCategory({ ...addNewCategory, IsIdentifiable: "2" }) : setAddNewCategory({ ...addNewCategory, IsIdentifiable: "0" })
        }
        // console.log({...newUserDetails, EmployeeIsAdmin: 0})

    }

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
                        Add new Category
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {/* <Multiselect
                        isObject={true}
                        singleSelect={true}
                        options={categoryData}
                        displayValue="CategoryName"
                        // selectedValues={[`${categoryList[0].toString()}`]}
                        onRemove={function noRefCheck() { }}
                        onSearch={function noRefCheck() { }}
                        onSelect={selectedCategoryId}
                    // options={categoryList}
                    /> */}

                    {/* <TextField label='Enter CategoryId' placeholder='Enter CategoryId' type='text' fullWidth required
                        onChange={e => setAddNewAsset({ ...addNewAsset, CategoryId: e.target.value })} value={addNewAsset.CategoryId} /> */}

                    <TextField label='Enter Category Name' placeholder='Enter Asset Name' type='text' fullWidth required
                        onChange={e => setAddNewCategory({ ...addNewCategory, CategoryName: e.target.value })} value={addNewCategory.AssetName} />

                    <TextField label='Enter Warning Quantity' placeholder='Enter Comments' type='numberSigned' fullWidth required
                        onChange={e => setAddNewCategory({ ...addNewCategory, WarningQuantity: e.target.value })} value={addNewCategory.WarningQuantity} />

                    {/* <TextField label='Enter Asset Details' placeholder='Enter Asset Details' type='text' fullWidth required
                        onChange={e => setAddNewAsset({ ...addNewAsset, AssetDetails: e.target.value })} value={addNewAsset.AssetDetails} /> */}

                    {/* <TextField label='Is Identifiable' placeholder='Is Identifiable (1 or 2)' type='text' fullWidth required
                        onChange={e => setAddNewAsset({ ...addNewAsset, IsIdentifiable: e.target.value })} value={addNewAsset.IsIdentifiable} /> */}

                    <Multiselect
                        isObject={false}
                        singleSelect={true}
                        selectedValues={[`${isIdentifiableList[0].toString()}`]}
                        onRemove={function noRefCheck() { }}
                        onSearch={function noRefCheck() { }}
                        onSelect={selectedIdentifiableLevel}
                        options={isIdentifiableList}
                    />



                </Modal.Body>


                <Modal.Footer>
                    <button className="button" onClick={SubmitHandler}>Submit</button>
                    <button className="buttonClose" onClick={onHide}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewCategory;

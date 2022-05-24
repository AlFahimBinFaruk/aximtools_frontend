import { MDBBtn, MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useGlobalAlertContext } from "../../../../contexts/alertContext";
import { addTool } from "../../../../features/tool/toolSlice"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
const AddProduct = () => {
    let { setShowAlert } = useGlobalAlertContext();
    const storage = getStorage();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        minQty: "",
        availQty: "",
        shortDesc: ""
    });

    const { name, price, minQty, availQty, shortDesc } = formData;
    const [thumbURL, setThumbURL] = useState("")
    //handle change of input
    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    };

    //uploa thub
    const uploadThumb = (file) => {
        console.log("file",file.name)
        const storageRef = ref(storage, file.name);
        let uploadTask = uploadBytesResumable(storageRef, file);
        //get the upload progress reting.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                setShowAlert({ msg: "file upload error occured", color: "danger" })
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    setThumbURL(downloadURL)
                });
            }
        );
    }

    //handle submit 
    const handleSubmit = () => {
        if (name && price && thumbURL && minQty && availQty && shortDesc) {
            let tool = {
                name,
                price,
                thumbURL,
                minQty,
                availQty,
                shortDesc
            }
            try {
                dispatch(addTool(tool))
                setShowAlert({ msg: "tool added successfully", color: "success" })
            } catch (error) {
                setShowAlert({ msg: "some error occured", color: "danger" })
            }
        } else {
            setShowAlert({ msg: "provide all info", color: "danger" })
        }
    }
    return (
        <MDBCol size="12" md="8" lg="6" className="mx-auto">
            <h5>Add a product</h5>
            <div className="form">
                {/* name */}
                <MDBInput
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    label="Product Name"
                    size="sm"
                    className="mb-2"
                />
                {/* price */}
                <MDBInput
                    type="number"
                    id="price"
                    value={price}
                    onChange={handleChange}
                    label="Price per unit"
                    size="sm"
                    className="mb-2"
                />
                {/* thumb */}
                <div className="thumb mb-2">
                    <small>Product Thumbnail</small>
                    <MDBInput
                        type="file"
                        size="sm"
                        onChange={(e) => uploadThumb(e.target.files[0])}
                    />
                </div>
                {/* min order qty */}
                <MDBInput
                    type="number"
                    id="minQty"
                    value={minQty}
                    onChange={handleChange}
                    label="Minimum order qty"
                    size="sm"
                    className="mb-2" />
                {/* available order qty */}
                <MDBInput
                    type="number"
                    id="availQty"
                    value={availQty}
                    onChange={handleChange}
                    label="Available order qty"
                    size="sm"
                    className="mb-2"
                />
                {/* short desc */}
                <MDBTextArea
                    rows={4}
                    id="shortDesc"
                    value={shortDesc}
                    onChange={handleChange}
                    label="Short desc"
                    size="sm"
                    className="mb-3"
                />

                {/* add btn */}
                <MDBBtn
                    onClick={handleSubmit}
                    block
                    className="rounded-0"
                    size="sm"
                    color="success">Add product</MDBBtn>
            </div>
        </MDBCol>
    )
}

export default AddProduct
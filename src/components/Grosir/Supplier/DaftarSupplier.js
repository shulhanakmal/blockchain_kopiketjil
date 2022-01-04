import { Fragment, React, useState } from "react";
import DaftarSupplierForm from "./DaftarSupplierForm";
import showResults from "../../showResults/showResults";
import UserService from "../../../services/user.service";

const DaftarSupplier = () => {
  const [files, imageFile] = useState("");

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const onFileChange = (file) => {
    imageFile(file);
  };

  const onLatChange = (latitude) => {
    setLat(latitude);
  };

  const onLongChange = (longitude) => {
    setLong(longitude);
  };

  const handleSubmit = (values) => {
    const formData = new FormData();

    if (
      values.nama_supplier != null &&
      values.lokasi_supplier != null &&
      values.nama_petani != null &&
      lat != "" &&
      long != "" &&
      values.estimatedProduction != null &&
      values.elevation != null &&
      values.unit != null &&
      files != ""
    ) {
      formData.append("nama_supplier", values.nama_supplier);
      formData.append("lokasi_supplier", values.lokasi_supplier);
      formData.append("nama_petani", values.nama_petani);
      formData.append("latitude", lat);
      formData.append("longitude", long);
      formData.append("link_maps", values.linkMaps);
      formData.append("estimatedProduction", values.estimatedProduction);
      formData.append("elevation", values.elevation);
      formData.append("unit", values.unit);

      formData.append("files", files);
      formData.append("fileName", files.name);

      UserService.addSupplier(formData).then(showResults("Data has been added"));
    } else {
      showResults("Please fill all the fields");
    }
  };

  return (
    <Fragment>
      <DaftarSupplierForm
        onSubmit={handleSubmit}
        onSelectImage={onFileChange}
        onSelectLat={onLatChange}
        onSelectLong={onLongChange}
      />
    </Fragment>
  );
};

export default DaftarSupplier;

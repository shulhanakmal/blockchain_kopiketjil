import { Fragment } from "react";
import showResults from "../../../showResults/showResults";
import EditBijiForm from "./EditBijiForm";
import UserService from "../../../../services/user.service";
import { useParams } from "react-router";

const EditBiji = () => {
  const { id } = useParams();

  const handleSubmit = (values) => {
    var raw = JSON.stringify(values);
    UserService.editBiji(id, raw).then(showResults("Data has been changed"));
  };

  return (
    <Fragment>
      <EditBijiForm onSubmit={handleSubmit} bijiID={id} />
    </Fragment>
  );
};

export default EditBiji;

import MaterialTable from 'material-table'
import { useEffect, useState } from 'react';
import Activities from './Activities';
import AdminPanel from './AdminPanel';
import AllAsset from './AllAsset';
import AssetDetails from './AssetDetails';
import AvailableAssets from './AvailableAssets';
import MyAssets from './MyAssets';
import Profile from './Profile';
import RequestedAssets from './RequestedAssets';
import Users from './Users';

const DashBoard = props => {
  console.log(props.selectedTable); // 1,2,3,4,5,6,7
  const [selectedTable, setSelectTable] = useState(1);


  useEffect(() => {
    setSelectTable(props.selectedTable);
  }, [props])

  return (
    <div className="Table">
      {selectedTable == 1 && <MyAssets />}
      {selectedTable == 2 && <Users />}
      {selectedTable == 3 && <AvailableAssets />}
      {selectedTable == 4 && <AssetDetails />}
      {selectedTable == 5 && <AdminPanel />}
      {selectedTable == 6 && <RequestedAssets />}
      {selectedTable == 7 && <AllAsset />}
      {selectedTable == 8 && <Activities />}
      {selectedTable == 9 && <Profile />}
    </div>

  );
}

export default DashBoard;

import React from 'react';
import useStatusUpdates from '@/services/statusUpdate/useStatusUpdates';
import { StatusUpdate as StatusUpdateType } from '@/graphql/__generated__/graphql';

function ListActivity() {
  // useStatusUpdates();
  const {
    statusUpdates,
    loading,
  }: { statusUpdates: StatusUpdateType; loading: boolean } = useStatusUpdates();
  statusUpdates && console.log(statusUpdates);

  return <div>activity</div>;
}

export default ListActivity;

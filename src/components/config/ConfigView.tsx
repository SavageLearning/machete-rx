import React, { useState } from 'react';
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Config } from 'src/models/config';

export interface IProps {
   configs: Config[];
}

const ConfigView: React.FC<IProps> = ({configs}) => {
  const [selectedRow, setSelectedRow] = useState('');
  return(
     <div>
      {`something static`}
      <DataTable value={configs} paginator={true} rows={15}
                  selectionMode="single" selection={selectedRow} onSelectionChange={e => setSelectedRow( e.value)}>
          <Column field="key" header="key" sortable={true} />
          <Column field="value" header="value" sortable={true} />
          <Column field="description" header="description" sortable={true} />
          <Column field="category" header="category" sortable={true} />
          <Column field="publicConfig" header="publicConfig" sortable={true} />
      </DataTable>
     </div>
  )
}

export default ConfigView;
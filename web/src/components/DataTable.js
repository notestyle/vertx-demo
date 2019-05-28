import React from 'react';
import MUIDataTable from "mui-datatables";

class DataTable extends React.Component {
    state = {
        columns: [
            {
                name: "id",
                label: "№",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "name",
                label: "Name",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "lastName",
                label: "LastName",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "role",
                label: "Role",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "createdDate",
                label: "CreatedDate",
                options: {
                    filter: false,
                    sort: false,
                }
            }
        ]
    }

    render() {
        const { datas } = this.props;

        return (
            <MUIDataTable
                title={"Customers"}
                data={datas.map(x => [x.id, x.name, x.lastName, x.role, x.createdDate])}
                columns={this.state.columns}
            />
        )
    }
}

export default DataTable;
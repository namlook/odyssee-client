import React, { PropTypes } from 'react';

// import CardWidget from 'odyssee-client/lib/components/widgets/CardWidget';

class CollectionQueryWidget extends React.Component {

  componentWillMount() {
    // this.initStore();
    const { ownActions } = this.props;
    ownActions.fetchData();
  }
  //
  // initStore() {
  //   const { params, collectionStore, linkedRouteParams, ownActions } = this.props;
  //   const requestedRecord = findRecordFromStore(collectionStore, linkedRouteParams, params);
  //   if (requestedRecord) {
  //     ownActions.update(requestedRecord);
  //   } else {
  //     ownActions.clear();
  //   }
  // }

  render() {
    // const { collectionActions, ...other } = this.props;

    return null;
    // return (
    //   <CardWidget _name="collection-query" {...other}>
    //     <p><button onClick={() => collectionActions.fetchCollection()}>fetch</button> expense</p>
    //   </CardWidget>
    // );
  }
}

CollectionQueryWidget.propTypes = {
  params: PropTypes.object.isRequired,
  linkedRouteParams: PropTypes.object,
  ownStore: PropTypes.object.isRequired,
  ownActions: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
};

export default CollectionQueryWidget;

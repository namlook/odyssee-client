'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _CardWidget = require('../../core/components/CardWidget');

var _CardWidget2 = _interopRequireDefault(_CardWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CollectionListWidget = function CollectionListWidget(props) {
  var ownStore = props.ownStore;
  var linkedRouteQuery = props.linkedRouteQuery;
  var searchStore = props.searchStore;
  var searchProperty = props.searchProperty;
  var properties = props.properties;
  var unstackable = props.unstackable;
  var onClickRedirectTo = props.onClickRedirectTo;
  var location = props.location;

  var other = _objectWithoutProperties(props, ['ownStore', 'linkedRouteQuery', 'searchStore', 'searchProperty', 'properties', 'unstackable', 'onClickRedirectTo', 'location']);

  var searchValue = linkedRouteQuery && location.query[linkedRouteQuery.search] || searchStore && searchStore.get('value');

  var storeContent = ownStore.get('content');

  var records = searchProperty && searchValue ? storeContent.filter(function (o) {
    return o[searchProperty] === searchValue;
  }) : storeContent;

  var displayRecord = function displayRecord(record) {
    return properties.map(function (property) {
      return _react2.default.createElement(
        'td',
        { key: property },
        record[property]
      );
    });
  };

  var recordClicked = function recordClicked(record) {
    // displayActions.update(record);
    if (onClickRedirectTo) {
      _reactRouter.browserHistory.push(onClickRedirectTo.replace(':id', record._id));
    }
  };

  var table = records.count() ? _react2.default.createElement(
    'table',
    {
      style: { border: 0 },
      className: 'ui ' + (unstackable && 'unstackable' || '') + ' striped table'
    },
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        ' ',
        properties.map(function (propname) {
          return _react2.default.createElement(
            'th',
            { key: propname },
            ' ',
            propname,
            ' '
          );
        }),
        ' '
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      records.map(function (record) {
        return _react2.default.createElement(
          'tr',
          {
            key: record._id,
            onClick: function onClick() {
              return recordClicked(record);
            }
          },
          displayRecord(record)
        );
      })
    )
  ) : _react2.default.createElement(
    'div',
    { className: 'ui center aligned segment' },
    ' ',
    "no records found",
    ' '
  );

  return _react2.default.createElement(
    _CardWidget2.default,
    _extends({ _name: 'collection-list' }, other),
    table
  );
};

CollectionListWidget.propTypes = {
  location: _react.PropTypes.object.isRequired,
  linkedRouteQuery: _react.PropTypes.object,
  ownStore: _react.PropTypes.object.isRequired,
  searchStore: _react.PropTypes.object,
  color: _react.PropTypes.string,
  unstackable: _react.PropTypes.bool,
  properties: _react.PropTypes.array.isRequired,
  onClickRedirectTo: _react.PropTypes.string,
  searchProperty: _react.PropTypes.string
};

// const getSearchFilter = (state, props) => (
//   props.location.query.search ||
//   props.searchStore && props.searchStore.get('value')
// );
//
// const getSearchProperty = (state, props) => props.searchProperty;
//
// const getContent = (state) => state.get('content');
//
// CollectionListWidget.selectors = {
//   content: createSelector(
//     [getSearchFilter, getContent, getSearchProperty],
//     (searchFilter, content, searchProperty) => (
//       searchFilter ? content.filter((o) => o[searchProperty] === searchFilter) : content
//     )
//   ),
// };

exports.default = CollectionListWidget;
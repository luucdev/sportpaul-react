import React, { Component } from 'react';

import { Link } from 'react-router';
import {
  Table,
  ButtonToolbar, Button,
  Glyphicon
} from 'react-bootstrap';

class ProductCartTable extends Component {
  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Produkt</th>
            <th>Art. Nr. / Farbe</th>
            <th>Größe</th>
            <th>Beflockung</th>
            <th>Preis</th>
            <th></th>
          </tr>
        </thead>
          {this.props.data && this.props.data.length > 0
          ? [(<tbody>
              {this.props.data.map((row, i) =>
                <tr key={i} data-id={row.id} data-product={row.name}>
                  <td>{i+1}</td>
                  <td><img className="product-thumbnail" onClick={this.props.onPreview.bind(null, row.colour != null && row.colour.picture != null ? row.colour.picture : row.picture)} src={"productpics/" + (row.colour != null && row.colour.picture != null ? row.colour.picture : row.picture)} />{row.name}</td>
                  <td>{row.internalid}{row.colour != null && [<br />, row.colour.id + " " + row.colour.name]}</td>
                  <td>{row.size}</td>
                  {(row.flockings && row.flockings.length > 0) ?
                    <td className="flocking">
                      {row.flockings.map((flocking, i) => flocking.description + (flocking.type == "0" ? " (" + flocking.value + ")" : "")).join(", ")}
                    </td>
                  : <td>-</td>}
                  <td>
                    <p>{this.getPriceFromPricegroups(row.pricegroups, row.size).toFixed(2).replace('.', ',')} €</p>
                    {(row.flockings && row.flockings.length > 0) && row.flockings.filter((el) => el.price > 0).map((flocking) => <p className="flocking-price">+{flocking.price.toFixed(2).replace('.', ',')} €</p>)}
                  </td>
                  <td className="buttons">
                    <ButtonToolbar>
                      <Button bsStyle="danger" bsSize="small" onClick={this.props.onRemove.bind(null, i)}><Glyphicon glyph="trash" /> Entfernen</Button>
                    </ButtonToolbar>
                  </td>
                </tr>
              )}
            </tbody>),
            (<tfoot>
              <tr>
                <td></td>
                <td colSpan="4">{this.props.data.length} Artikel</td>
                <td>{this.props.data.reduce((acc, val) => acc+this.getPriceFromPricegroups(val.pricegroups, val.size)+((val.flockings && val.flockings.length>0)?val.flockings.reduce((flacc, flocking) => flacc+flocking.price, 0):0), 0).toFixed(2).replace('.', ',')} €</td>
                <td></td>
              </tr>
            </tfoot>)] : <tbody><tr className="no-data"><td colSpan="7">Warenkorb leer</td></tr></tbody>}


      </Table>
    )
  }

  getPriceFromPricegroups(pricegroups, size) {
    for(var i in pricegroups) {
      if(pricegroups[i].sizes.includes(size)) return pricegroups[i].price;
    }
    return 0;
  }
}

export default ProductCartTable;

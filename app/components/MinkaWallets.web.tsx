import ReactDOM from 'react-dom';
import { MinkaWallets } from './MinkaWallets';

class MinkaWalletsWeb extends HTMLElement {
  public observer;
  public ReactComponent = {};

  constructor() {
    super();
    this.observer = new MutationObserver(() => this.update());
    this.observer.observe(this, { attributes: true });
  }

  connectedCallback() {
    this.mount();
  }

  disconnectedCallback() {
    this.unmount();
    this.observer.disconnect();
  }

  update() {
    this.unmount();
    this.mount();
  }

  mount() {
    const props = {
      server: "",
      ledger: "",
      ...this.getProps(this.attributes, MinkaWallets.propTypes),
      ...this.getEvents(MinkaWallets.propTypes),
    };

    ReactDOM.render(<MinkaWallets {...props} />, this);
  }
  unmount() {
    ReactDOM.unmountComponentAtNode(this);
  }

  getEvents(propTypes: any) {
    if (!propTypes) {
      return {};
    }
    return Object.keys(propTypes)
      .filter((key) => /on([A-Z].*)/.exec(key))
      .reduce(
        (events, ev) => ({
          ...events,
          [ev]: (args: any) =>
            this.dispatchEvent(new CustomEvent(ev, { ...args })),
        }),
        {}
      );
  }

  getProps(attributes: any, propTypes: any) {
    propTypes = propTypes || {};
    return [...attributes]
      .filter((attr) => attr.name !== 'style')
      .map((attr) => this.convert(propTypes, attr.name, attr.value))
      .reduce((props, prop) => ({ ...props, [prop.name]: prop.value }), {});
  }

  convert(propTypes: any, attrName: any, attrValue: any) {
    const propName = Object.keys(propTypes).find(
      (key) => key.toLowerCase() === attrName
    );
    let value = attrValue;

    if (attrValue === 'true' || attrValue === 'false') {
      value = attrValue === 'true';
    } else if (!isNaN(attrValue) && attrValue !== '') {
      value = +attrValue;
    } else if (/^{.*}/.exec(attrValue)) {
      value = JSON.parse(attrValue);
    }
    return { name: propName ? propName : attrName, value: value };
  }
}

if( !customElements.get('jet-minka-wallets') ){
  customElements.define('jet-minka-wallets', MinkaWalletsWeb);
}

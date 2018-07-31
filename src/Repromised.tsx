import { PureComponent, ReactNode } from 'react';

type Children<Value> = (value: Value, isProcessing: boolean) => ReactNode;

type Props<Value> = {
  promise: () => Promise<Value>;
  initial: Value;
  then?: (value: Value) => void;
  catch?: (err: Error) => void;
  beforeResolve?: () => void;
  children?: Children<Value>;
};

type State<Value> = {
  value: Value;
  isProcessing: boolean;
};

class Repromised<Value> extends PureComponent<Props<Value>, State<Value>> {
  public componentDidMount() {
    this.setState({ isProcessing: true });

    if (this.props.beforeResolve) {
      this.props.beforeResolve();
    }

    this.props
      .promise()
      .then(value => {
        this.setState({ value, isProcessing: false });

        if (this.props.then) {
          this.props.then(value);
        }
      })
      .catch(err => {
        if (this.props.catch) {
          this.props.catch(err);
        }

        this.setState({ isProcessing: false });
      });
  }

  public render() {
    if (this.props.children) {
      return this.props.children(this.state.value, this.state.isProcessing);
    }

    return null;
  }

  public constructor(props: Props<Value>) {
    super(props);

    this.state = {
      value: props.initial,
      isProcessing: false,
    };
  }
}

export default Repromised;

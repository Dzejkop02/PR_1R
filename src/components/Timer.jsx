import React, {Component} from "react";

class Timer extends Component {
    state = {
        number: 0,
        count: 0,
        intervalId: null,
    };

    stop = () => {
        clearInterval(this.state.intervalId);
    }

    handleChange = e => {
        this.setState({
            count: 0,
            number: e.target.value,
        })
    }

    handleStart = () => {
        this.stop();

        const intervalId = setInterval(() => {
            if (this.state.count < this.state.number) {
                this.setState({
                    count: this.state.count+1,
                });
            }
            else {
                this.stop();
            }
        }, 1000);

        this.setState({
            intervalId,
        });
    }

    handlePause = () => {
        this.stop();
    }

    handleReset = () => {
        this.stop();
        this.setState({
            count: 0,
        })
    }

    render() {
        return <div>
            <div className="input-group" style={{maxWidth: '400px'}}>
                <input onChange={this.handleChange} value={this.state.number} type="number" className="form-control" placeholder="enter number"/>
                    <div className="input-group-append">
                        <button className="btn btn-success btn-sm" onClick={this.handleStart}>Start</button>
                        <button className="btn btn-secondary btn-sm" onClick={this.handlePause}>Pause</button>
                        <button className="btn btn-danger btn-sm" onClick={this.handleReset}>Reset</button>
                    </div>
            </div>
            <p style={{margin: '15px', fontSize: '24px'}}>{this.state.count}</p>
        </div>
    }
}

export default Timer;
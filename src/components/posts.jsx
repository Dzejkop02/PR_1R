import React, {Component} from "react";
import Pagination from "./common/pagination";

import {paginate} from "../utils/paginate";
import PostsTable from "./postsTable";
import _ from 'lodash';

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            pageSize: 4,
            currentPage: 1,
            sortColumn: {path: 'title', order: 'asc'},
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                    // console.log(result)
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    };

    handleDelete = (post) => {
        const posts = this.state.items.filter(p => p.id !== post.id);
        this.setState({items: posts});
    };

// metoda ta ustawia kierunek sortowania asc lub desc (rosnąco lub malejąco)
    handleSort = (path) => {
        const sortColumn = {...this.state.sortColumn};
        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.setState({sortColumn});
    };

    renderSortIcon = (column) => {

        if (column !== this.state.sortColumn.path) {
            return null;
        }
        if (this.state.sortColumn.order === 'asc') {
            return <i className="fa fa-sort-asc"></i>
        }

        if (this.state.sortColumn.order === 'desc') {
            return <i className="fa fa-sort-desc"></i>
        }
    };

     handleAdd = async () => {
        const data = this.state.items.sort((a, b) => {
            const numA = a.title.split(' ')[1];
            const numB = b.title.split(' ')[1];

            return numA-numB;
        });

        const lastItem = data.at(-1);
        const nextIndex = Number(lastItem.title.split(' ')[1]) + 1;

        const newItem = {
            title: `Post ${nextIndex}`,
            text: lastItem.text,
            id: lastItem.id,
            image: lastItem.image,
        }

        this.setState({
            items: [...this.state.items, newItem],
        });

         delete newItem.id;

         const response = await fetch('http://localhost:3001/api/posts', {
             method: "POST",
             // mode: "cors",
             // cache: "no-cache",
             // credentials: "same-origin",
             headers: {
                 "Content-Type": "application/json",
             },

             body: JSON.stringify(newItem),
         });
    }

    render() {
        const {items, pageSize, currentPage, sortColumn} = this.state;

        if (!items.length) {
            return <p>Brak wpisów</p>
        }

        // const sorted = _.orderBy(items, [sortColumn.path], [sortColumn.order]);

        const sorted = items.sort((a, b) => {
            const {path, order} = sortColumn;

            if (path === 'title') {
                const numA = a.title.split(' ')[1];
                const numB = b.title.split(' ')[1];

                return (order === 'asc') ? numA-numB : numB-numA;
            } else {
                if (order === 'asc') {
                    return (a.text > b.text) ? -1 : 1;
                }
                else {
                    return (a.text > b.text) ? 1 : -1;
                }
            }
        });


        const posts = paginate(sorted, currentPage, pageSize);

        return (
            <React.Fragment>
                <PostsTable
                    items={posts}
                    handleAdd={this.handleAdd}
                    sortIcon={this.renderSortIcon}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}/>
                <Pagination
                    itemsCount={items.length}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onPageChange={this.handlePageChange}
                />
            </React.Fragment>)
    }
}

export default Posts;
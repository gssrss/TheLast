import React, { Component } from "react"
import fire from "./config/fire"
import axios from "axios"
import "./Home.css"
import PictureRenderer from "./PictureRenderer"
import SongRenderer from "./SongRenderer"
import Loader from "./Loader.gif"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model"
class Home extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.state = {
      modules: [ClientSideRowModelModule],
      columnDefs: [
        {
          headerName: "Artist",
          field: "artist.picture_small",
          cellRenderer: "picture",
          width: "80",
        },
        {
          headerName: "Artist name",
          field: "artist.name",
          width: "120",
          headerClass: "name",
        },
        {
          headerName: "Song name",
          field: "title_short",
          width: "120",
        },
        {
          headerName: "Song",
          field: "preview",
          cellRenderer: "song",
          width: "330",
          headerClass: "name",
        },
      ],
      defaultColDef: {
        resizable: true,
      },
      rowData: [],
      getRowHeight: function () {
        return 57
      },
      frameworkComponents: {
        picture: PictureRenderer,
        song: SongRenderer,
      },
      query: "",
      loading: false,
      message: "",
    }
    this.cancel = ""
  }
  logout() {
    fire.auth().signOut()
  }
  searchResults = (indexNumber = "", query) => {
    const indexNum = indexNumber ? `&index=25${indexNumber}` : ""
    const url = `/search?redirect_uri=http%253A%252F%252Fguardian.mashape.com%252Fcallback&q=${query}${indexNum}`
    if (this.cancel) {
      this.cancel.cancel()
    }
    this.cancel = axios.CancelToken.source()
    axios
      .get(url, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const resultNotFoundMsg = !res.data.data.length
          ? "No more search results, please try a new search"
          : ""
        console.log(resultNotFoundMsg)
        this.setState({
          rowData: res.data.data,
          message: resultNotFoundMsg,
          loading: false,
        })
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Low Network",
          })
        }
      })
  }
  renderSearchResults = () => {
    const { rowData } = this.state
    if (Object.keys(rowData).length && rowData.length) {
      return (
        <div
          className="ag-theme-alpine"
          style={{ height: "500px", width: "50%" }}
        >
          <AgGridReact
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            frameworkComponents={this.state.frameworkComponents}
            getRowHeight={this.state.getRowHeight}
            // rowClassRules={this.state.rowClassRules}
          ></AgGridReact>
        </div>
      )
    }
  }
  onInputChange = (event) => {
    const query = event.target.value
    if (!query) {
      this.setState({ query: query, results: {}, message: "" })
    } else {
      this.setState({ query: query, loading: true, message: "" }, () => {
        this.searchResults(1, query)
      })
    }
  }
  render() {
    const query = this.state.query
    const message = this.state.message
    const loading = this.state.loading
    return (
      <div className="Search">
        <h1>Find your music</h1>
        <label>
          <input
            className="label"
            type="text"
            value={query}
            placeholder="Search..."
            onChange={this.onInputChange}
          />
        </label>
        {message && <p className="p">{message}</p>}
        <img
          src={Loader}
          className={`loader ${loading ? "show" : "hide"}`}
          alt="loader"
        />
        {this.renderSearchResults()}
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}
export default Home

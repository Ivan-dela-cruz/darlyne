import React, { useState } from "react";
import { JSONTree } from "react-json-tree";
import { themeJsonTree } from "./utils/config";
import ReactJson from "react-json-view";
import CsvDownloadButton from "react-json-to-csv";

const JSONTreeComponent = () => {
  const [json, setJson] = useState({});
  const [jsonCsv, setJsonCsv] = useState([]);
  const [jsonStringify, setJsonStringify] = useState(null);
  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  const jsonStringifyToJson = () => {
    const json = JSON.parse(jsonStringify);
    let newObj = {};
    for (const prop in json) {
      newObj[prop] = isJsonString(json[prop])
        ? JSON.parse(json[prop])
        : json[prop];
    }
    setJson(newObj);
  };

  const parseArrayJson = () => {
    const json = JSON.parse(jsonStringify);
    setJsonCsv(json);
  }
  const style = {
    padding: "10px",
    borderRadius: "3px",
    margin: "10px 0px",
  };

  return (
    <div className="box-json">
      <section>
        <h4 className="title">JSON STRINGIFY TO JSON</h4>
        <div className="CAJATEXTO">
          <textarea
            className="input-json"
            value={jsonStringify}
            onChange={(e) => setJsonStringify(e.target.value)}
            placeholder="Ingrese su Json Stringify"
          ></textarea>
        </div>
        <div className="box-btn-inline">
          <button
            className="btn-json"
            type="button"
            onClick={() => jsonStringifyToJson()}
          >
            CONVERTIR
          </button>
          <button
            className="btn-json"
            type="button"
            onClick={() => parseArrayJson()}
          >
            Validar a CVS
          </button>
          <CsvDownloadButton
            title="Download as Excel"
            data={jsonCsv}
            filename="json-to-file.csv"
          />
        </div>
      </section>
      <section>
        <div className="json-result">
          <h4 className="title">JSON TREE</h4>
          <ReactJson
            collapseStringsAfterLength={20}
            indentWidth={4}
            displayObjectSize
            displayDataTypes
            collapsed={true}
            style={style}
            theme="monokai"
            src={json}
          />
          {/* <JSONTree  data={json} theme={themeJsonTree} invertTheme={false} /> */}
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default JSONTreeComponent;

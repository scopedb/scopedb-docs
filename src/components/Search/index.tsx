import React from "react";
import { DocSearch } from "@docsearch/react";
import "./index.module.css";

export default function Search() {
  return (
    <DocSearch
      appId={"WHHXVN2FB9"}
      apiKey={"6f62b98f75d6f26b5a1c34ee341f62c5"}
      indexName={"scopedb"}
    />
  );
}

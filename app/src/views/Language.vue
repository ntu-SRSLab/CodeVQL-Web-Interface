<template>
  <b-container class="bv-example-row">
    <b-container style="text-align: left">
      <h1>Language</h1>
    </b-container>
    <table style="border-collapse: separate; border-spacing: 20px 20px">
      <tbody>
        <tr>
          <td style="vertical-align: baseline; padding-top: 30px">
            <div
              style="
                box-sizing: bordered-box;
                border: 2px solid #bbb;
                background: #f1f1f1;
              "
            >
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Summary of syntax</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Fact object details</a>
                </li>
              </ul>
            </div>
          </td>
          <td>
            <div style="text-align: left">
              <h2>Summary of syntax</h2>
              <div style="background-color: #eeffcc; padding: 20px">
                stmt_list :- stmt (stmt_list)? <br />
                <br />
                stmt :- "import java" | "define" version_selection_opts |
                select_stmt <br />
                <br />
                version_selection_opts :- lower_id string_literal (","
                version_selection_opts)? | lower_id "("
                multiple_versions_selection_opts ")" (","
                version_selection_opts)? | lower_id "(" string_literal ".."
                string_literal ")" ("," version_selection_opts)? <br />
                <br />
                multiple_versions_selection_opts :- string_literal (","
                multiple_ versions_selection_opts)? select_stmt :- ("from"
                from_opts)? ("range" range_opts)? ("where" where_opts)? "select"
                select_opts <br />
                <br />
                select_opts :- expr ("as" lower_id)? (select_opts)? <br />
                <br />
                from_opts :- upper_id lower_id ("," from_opts)? <br />
                <br />
                range_opts :- lower_id "@" lower_id ("," range_opts) <br />
                <br />
                where_opts :- ("exists" | "not exist" | "forall") (" reason_opts
                "that" formula ")" ("and" whereopts)? <br />
                <br />
                reason_opts :- lower_id ("," reason_opts) <br />
                <br />
                formula :- "(" formula ")" | formula "or" formula | formula
                "and" formula | "not" formula | primary (">=" | ">" | "=" | "!="
                | "" | "=") primary | call <br />
                <br />
                primary :- lower_id | string_literal | int_literal | call <br />
                <br />
                call :- lower_id "." lower_id "(" (string_literal)? ")" <br />
                <br />
                expr :- "_" | primary
              </div>

              <h2>Fact Method Summary</h2>
              <div style="background-color: #eeffcc; padding: 20px">
                  <h3>TestClass</h3> <TestClassMethodSummary/>
                  <h3>AbstractClass</h3> <AbstractClassMethodSummary/>
                  <h3>Method</h3> <MethodMethodSummary/>

                  <h3>Update</h3> <UpdateMethodSummary/>
                  <h3>Insert</h3> <InsertMethodSummary/>
                  <h3>Delete</h3> <DeleteMethodSummary/>

                  <h3>MethodAccess</h3> <MethodAccessMethodSummary/>
                  <h3>Containment</h3> <ContainmentMethodSummary/>
                  <h3>Reference</h3> <ReferenceMethodSummary/>
                  <h3>Inheritance</h3> <InheritanceMethodSummary/>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
import TestClassMethodSummary from "../components/TestClassMethodSummary";
import AbstractClassMethodSummary from "../components/AbstractClassMethodSummary";
import MethodMethodSummary from "../components/MethodMethodSummary";
import UpdateMethodSummary from "../components/UpdateMethodSummary";
import InsertMethodSummary from "../components/InsertMethodSummary";
import DeleteMethodSummary from "../components/DeleteMethodSummary";
import MethodAccessMethodSummary from "../components/MethodAccessMethodSummary";
import ContainmentMethodSummary from "../components/ContainmentMethodSummary";
import ReferenceMethodSummary from "../components/ReferenceMethodSummary";
import InheritanceMethodSummary from "../components/InheritanceMethodSummary";
export default {
  name: "Language",
  components: {
    TestClassMethodSummary,
    AbstractClassMethodSummary,
    MethodMethodSummary,
    UpdateMethodSummary,
    InsertMethodSummary,
    DeleteMethodSummary,
    MethodAccessMethodSummary,
    ContainmentMethodSummary,
    ReferenceMethodSummary,
    InheritanceMethodSummary
  }
};
</script>
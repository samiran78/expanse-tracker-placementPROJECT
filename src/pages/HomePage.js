import React, { useState, useEffect } from "react";
import { Form, message, Modal, Select, Table } from "antd";
import Layout from "../components/layout/Layout";
import { DatePicker } from "antd";
import Input from "antd/es/input/Input";
import axios from "axios";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  UnderlineOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;
const HomePage = () => {
  const [showModel, setShowModel] = useState(false);
  const [loading, setloading] = useState(false);
  const [alltransactions, setAlltransactions] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  //tables to get trasnactions..
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Catagory",
      dataIndex: "catagory",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditable(record);
              setShowModel(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={()=> deletehandler(record)}/>
        </div>
      ),
    },
  ];
  //gettransactions..
  const getAlltransanction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setloading(true);
      const res = await axios.post("/api/transactions/get-transaction", {
        userid: user._id,
        frequency,
        type,
      });
      setloading(false);
      setAlltransactions(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error("Fetch Issue with trsansactions...");
    }
  };
  //useeffect..
  useEffect(() => {
    getAlltransanction();
  }, [frequency, selectedDate, type]);
  //deleteTRANSACTION-HANDLER........
  const deletehandler = async(record) => {
    try {
      setloading(true);
      await axios.post("/api/transactions/delete-transaction", {transactionId: record._id} )
      setloading(false);
      message.success("Transaction deleted successfully");
    } catch (error) {
      setloading(false);
      console.log(error);
      message.error("unable to delete......")
    }
  };

  //form handling...
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setloading(true);
      if (editable) {
        await axios.post("/api/transactions/edit-transaction", {
          payload: {
            ...values,
            userid: user._id,
          },
          transactionId: editable._id,
        });
        setloading(false);
        setShowModel(false);
        setEditable(null);
        message.success("Transaction updated successfully");
      } else {
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        setloading(false);
        setShowModel(false);
        setEditable(null);
        message.success("Transaction added successfully");
      }
    } catch (error) {
      setloading(false);
      message.error("Transaction failed!!");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expanse">Expanse</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div className="switch-icon">
          <UnderlineOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div
          className="btn"
          style={{
            backgroundColor: "violet",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setShowModel(true)}
        >
          Add New
        </div>
      </div>
      <div className="content">
        {/* data can viewed as per the rerquiremenets... */}
        {viewData === "table" ? (
          <Table columns={columns} dataSource={alltransactions} />
        ) : (
          //have to show analytics data..
          <Analytics alltransactions={alltransactions} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModel}
        onCancel={() => setShowModel(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expanse">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Catagory" name="catagory">
            <Select>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="cashback">Cashback</Select.Option>
              <Select.Option value="travelling">travelling</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="recharge">Recharge</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="borrow">borrow</Select.Option>
              <Select.Option value="medicine">medicine</Select.Option>
              <Select.Option value="asyourwish">Etc..</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-Content-center">
            <button
              className="btn"
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;

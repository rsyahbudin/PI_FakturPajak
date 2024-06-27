import React, { useState, useEffect } from "react";
import axios from "axios";
import { EyeIcon, PencilIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TablePagination,
  TableSortLabel,
  TextField,
  Box,
  Grid,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { CircularProgress } from "@mui/material"; // Import CircularProgress from Material-UI

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://backend.transmart.co.id/api/trx_tiket"
        // "https://fakturpajak.transmart.co.id:3001/api/trx_tiket"
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleStatusChange = async () => {
    try {
      if (!newStatus) {
        alert("Please select a status.");
        return;
      }

      const { TT_TRXNO, TT_STATUS, TT_REMARKS } = selectedTransaction;

      // Panggil endpoint untuk mengubah status dan catatan transaksi
      const response = await axios.post(
        "https://backend.transmart.co.id/api/update-status-and-remarks",
        // "https://fakturpajak.transmart.co.id:3001/api/update-status-and-remarks",
        {
          trxno: TT_TRXNO,
          status: newStatus,
          remarks: remarks,
        }
      );

      console.log("Transaction updated successfully:", response.data);

      // Jika status dipilih menjadi "Closed" dan ada file, jalankan api/upload
      if (newStatus === "C" && file) {
        const formData = new FormData();
        formData.append("TT_TRXNO", TT_TRXNO);
        formData.append("file", file);

        const uploadResponse = await axios.post(
          "https://backend.transmart.co.id/api/upload",
          // "https://fakturpajak.transmart.co.id:3001/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("File uploaded successfully:", uploadResponse.data);
      }

      // Setelah berhasil, tutup modal
      handleCloseModal();
      fetchTransactions(); // Auto refresh data transaksi
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
    setNewStatus("");
    setRemarks("");
    setFile(null); // Reset file state saat modal ditutup
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const compareDates = (dateA, dateB) => {
    const date1 = new Date(dateA);
    const date2 = new Date(dateB);
    if (order === "asc") {
      return date1 - date2;
    } else {
      return date2 - date1;
    }
  };

  const compareValues = (valueA, valueB) => {
    if (order === "asc") {
      return typeof valueA === "string"
        ? valueA.localeCompare(valueB)
        : valueA - valueB;
    } else {
      return typeof valueB === "string"
        ? valueB.localeCompare(valueA)
        : valueB - valueA;
    }
  };

  const compareDurations = (durationA, durationB) => {
    if (order === "asc") {
      return durationA - durationB;
    } else {
      return durationB - durationA;
    }
  };

  const compareCurrency = (currencyA, currencyB) => {
    // Ensure currencyA is a string
    if (typeof currencyA !== "string") {
      console.error("currencyA is not a string:", currencyA);
      currencyA = String(currencyA); // Convert to string if it's not
    }

    // Ensure currencyB is a string
    if (typeof currencyB !== "string") {
      console.error("currencyB is not a string:", currencyB);
      currencyB = String(currencyB); // Convert to string if it's not
    }

    const amountA = parseFloat(currencyA.replace(/[^\d.-]/g, ""));
    const amountB = parseFloat(currencyB.replace(/[^\d.-]/g, ""));

    if (order === "asc") {
      return amountA - amountB;
    } else {
      return amountB - amountA;
    }
  };

  const handleSort = (property) => {
    let isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedTransactions = () => {
    const comparator = (a, b) => {
      switch (orderBy) {
        case "TT_INSERT_DATE_FORMATTED":
          return compareDates(
            a.TT_INSERT_DATE_FORMATTED,
            b.TT_INSERT_DATE_FORMATTED
          );
        case "TT_STORE":
        case "TT_TRXNO":
        case "TT_SALES_DATE":
        case "TT_NAMA":
        case "TT_EMAIL":
        case "TT_STATUS":
          return compareValues(a[orderBy], b[orderBy]);
        case "Durasi":
          return compareDurations(a.Durasi, b.Durasi);
        case "TT_TOTAL_AMOUNT_PAID":
          return compareCurrency(
            a.TT_TOTAL_AMOUNT_PAID,
            b.TT_TOTAL_AMOUNT_PAID
          );
        default:
          return 0;
      }
    };

    return transactions.slice().sort(comparator);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, sortedTransactions().length - page * rowsPerPage);

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (value) => {
    setStatusFilter(value);
    handleFilterClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "filter-popover" : undefined;

  return (
    <Box mt={4} mx={2}>
      <Grid container spacing={2} alignItems="center" mb={2}>
        {" "}
        {/* Tambahkan margin top */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search"
            variant="outlined"
            placeholder="ID Transaction"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* Funnel icon button for filtering */}
          <button
            onClick={handleFilterClick}
            className="text-black p-2 rounded-lg hover:bg-gray-200 focus:outline-none"
          >
            <FunnelIcon className="h-6 w-6" />
          </button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleFilterClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <List>
              <ListItem button onClick={() => handleFilterSelect("")}>
                <ListItemText primary="All" />
              </ListItem>
              <ListItem button onClick={() => handleFilterSelect("W")}>
                <ListItemText primary="Waiting Confirmation" />
              </ListItem>
              <ListItem button onClick={() => handleFilterSelect("O")}>
                <ListItemText primary="Open" />
              </ListItem>
              <ListItem button onClick={() => handleFilterSelect("P")}>
                <ListItemText primary="Process" />
              </ListItem>
              <ListItem button onClick={() => handleFilterSelect("C")}>
                <ListItemText primary="Closed" />
              </ListItem>
            </List>
          </Popover>
          {/* Filter menu */}
          {filterMenuOpen && (
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginTop: "8px" }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="W">Waiting Confirmation</MenuItem>
              <MenuItem value="O">Open</MenuItem>
              <MenuItem value="P">Process</MenuItem>
              <MenuItem value="C">Closed</MenuItem>
            </Select>
          )}
        </Grid>
      </Grid>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          mt={2}
          sx={{ maxHeight: 550, overflow: "auto" }}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: "error.main",
                color: "white",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  No
                </TableCell>

                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  <TableSortLabel
                    active={orderBy === "TT_INSERT_DATE_FORMATTED"}
                    direction={
                      orderBy === "TT_INSERT_DATE_FORMATTED" ? order : "asc"
                    }
                    onClick={() => handleSort("TT_INSERT_DATE_FORMATTED")}
                  >
                    Request Date
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  <TableSortLabel
                    active={orderBy === "TT_STORE"}
                    direction={orderBy === "TT_STORE" ? order : "asc"}
                    onClick={() => handleSort("TT_STORE")}
                  >
                    Store
                  </TableSortLabel>
                </TableCell>

                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  <TableSortLabel
                    active={orderBy === "TT_TRXNO"}
                    direction={orderBy === "TT_TRXNO" ? order : "asc"}
                    onClick={() => handleSort("TT_TRXNO")}
                  >
                    ID Transaction
                  </TableSortLabel>
                </TableCell>

                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  <TableSortLabel
                    active={orderBy === "Durasi"}
                    direction={orderBy === "Durasi" ? order : "asc"}
                    onClick={() => handleSort("Durasi")}
                  >
                    Duration
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  <TableSortLabel
                    active={orderBy === "TT_SALES_DATE"}
                    direction={orderBy === "TT_SALES_DATE" ? order : "asc"}
                    onClick={() => handleSort("TT_SALES_DATE")}
                  >
                    Sales Date
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  <TableSortLabel
                    active={orderBy === "TT_TOTAL_AMOUNT_PAID"}
                    direction={
                      orderBy === "TT_TOTAL_AMOUNT_PAID" ? order : "asc"
                    }
                    onClick={() => handleSort("TT_TOTAL_AMOUNT_PAID")}
                  >
                    Total Amount Paid
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  <TableSortLabel
                    active={orderBy === "TT_NAMA"}
                    direction={orderBy === "TT_NAMA" ? order : "asc"}
                    onClick={() => handleSort("TT_NAMA")}
                  >
                    Nama
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  <TableSortLabel
                    active={orderBy === "TT_STATUS"}
                    direction={orderBy === "TT_STATUS" ? order : "asc"}
                    onClick={() => handleSort("TT_STATUS")}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTransactions()
                .filter(
                  (trx) =>
                    (statusFilter === "" || trx.TT_STATUS === statusFilter) &&
                    trx.TT_TRXNO.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    )
                )
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((trx, index) => {
                  const startIndex = page * rowsPerPage;
                  return (
                    <TableRow key={trx.TT_TRXNO}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>{trx.TT_INSERT_DATE_FORMATTED}</TableCell>
                      <TableCell>{trx.TT_STORE}</TableCell>
                      <TableCell>{trx.TT_TRXNO}</TableCell>
                      <TableCell>
                        <span
                          className={
                            trx.ms_name === "OPEN" && trx.Durasi === 2
                              ? "bg-yellow-700 text-white py-1 px-2 rounded-full"
                              : trx.ms_name === "ON PROGRESS" &&
                                trx.Durasi >= 10 &&
                                trx.Durasi < 15
                              ? "bg-yellow-700 text-white py-1 px-2 rounded-full"
                              : (trx.Durasi >= 3 && trx.ms_name === "OPEN") ||
                                (trx.Durasi >= 15 &&
                                  trx.ms_name === "ON PROGRESS")
                              ? "bg-red-500 text-white py-1 px-2 rounded-full"
                              : ""
                          }
                        >
                          {trx.Durasi} Hari
                        </span>
                      </TableCell>
                      <TableCell>{trx.TT_SALES_DATE}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(trx.TT_TOTAL_AMOUNT_PAID)}
                      </TableCell>
                      <TableCell>{trx.TT_NAMA}</TableCell>
                      <TableCell>{trx.TT_EMAIL}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <span
                          className={`inline-block text-center  font-semibold py-1 px-2 rounded-full ${
                            trx.TT_STATUS === "O"
                              ? "bg-green-500 text-white text-sm"
                              : trx.TT_STATUS === "C"
                              ? "bg-red-500 text-white text-sm"
                              : trx.TT_STATUS === "P"
                              ? "bg-yellow-800 text-white text-xs"
                              : "bg-orange-800 text-white text-xs"
                          }`}
                        >
                          {trx.ms_name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => {
                            setSelectedTransaction(trx);
                            setShowModal(true);
                          }}
                          className="hover:bg-gray-300 font-bold py-2 px-4 rounded"
                        >
                          <PencilIcon className="h-5 w-5 text-blue-500" />
                        </button>
                        <Link to={`/view-details/${trx.TT_TRXNO}`}>
                          <button className="hover:bg-gray-300 font-bold py-2 px-4 rounded">
                            <EyeIcon className="h-5 w-5 text-green-500" />
                          </button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 70 * emptyRows }}>
                  <TableCell colSpan={11} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleStatusChange={handleStatusChange}
        selectedTransaction={selectedTransaction}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        remarks={remarks}
        setRemarks={setRemarks}
        file={file}
        setFile={setFile}
      />
    </Box>
  );
}

export default TransactionTable;

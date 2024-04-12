'use client'
// import Image from "next/image";
import RootLayout from "@/app/layout";
import { useRouter } from 'next/navigation';
// import { useCallback, useState } from 'react';
import {Button} from "@nextui-org/react";
import Nav from "@/app/components/navbar";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import Root from "postcss/lib/root";

const rows = [
  {
    key: "1",
    name: "Booking 1",
    date: "2024-04-01",
    status: "Confirmed",
  },
  {
    key: "2",
    name: "Booking 2",
    date: "2024-04-05",
    status: "Confirmed",
  },
  {
    key: "3",
    name: "Booking 3",
    date: "2024-04-10",
    status: "Canceled",
  },
];

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "delete",
    label: "Delete Booking",
  }
];

const statusColorMap = {
  Confirmed: "green",
  Canceled: "red",
};

export default function BookingTable() {
  const handleDelete = (key) => {
    // Implement your delete logic here
    console.log("Delete booking with key:", key);
  };

  return (
    <RootLayout>
      <Nav />
      <Table className="text-center mt-4" aria-label="Bookings table" style={{ margin: '0 auto'}}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} style={{ textAlign: 'center' }}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey, index) => (
                <TableCell style={{ textAlign: 'center' }} key={index}>
                  {columnKey !== 'delete' ? (
                    columnKey === 'status' ? (
                      <span style={{ color: statusColorMap[item[columnKey]] }}>
                        {item[columnKey]}
                      </span>
                    ) : (
                      item[columnKey]
                    )
                  ) : (
                    <Button onClick={() => handleDelete(item.key)} size="sm">
                      Delete
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </RootLayout>
  );
}
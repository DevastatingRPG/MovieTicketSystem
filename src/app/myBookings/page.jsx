'use client'
// import Image from "next/image";
import { useEffect, useState } from "react";
import RootLayout from "@/app/layout";
import { useRouter } from 'next/navigation';
// import { useCallback, useState } from 'react';
import { Button } from "@nextui-org/react";
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
        label: "Show",
    },
    {
        key: "b_date",
        label: "Date",
    },
    {
        key: "payment_method",
        label: "Payment Method",
    },
    {
        key: "b_amount",
        label: "Cost",
    },
    {
        key: "delete",
        label: "Delete Booking",
    }
];

export default function BookingTable() {

    const [bookings, setBookings] = useState([]);

    const formatDate = (b_date) => {
        const date = new Date(b_date);
        const day = String(date.getUTCDate()).padStart(2, '0'); // returns the day of the month (from 1-31)
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // returns the month (from 0-11, hence the +1 to make it 1-12)
        const year = date.getUTCFullYear(); // returns the year
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }


    const getBookings = async () => {
        try {
            const uid = localStorage.getItem('uid');
            const data = { uid };
            const response = await fetch('/api/myBookings', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const rows = await response.json();
            setBookings(rows['data'][0]);
        }
        catch (err) {
            console.error("Error fetching Bookings : ", err);
        }
    }

    useEffect(() => {
        // Fetch movie data from the backend server
        getBookings();
    }, []);

    const handleDelete = async (bid) => {
        // Implement your delete logic here
        const data = { bid };
        try {
            const response = await fetch('/api/delBookings', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setBookings(bookings.filter(booking => booking.BID !== bid));
            }
            else {
            }
        }
        catch(e){
            console.err("delete booking error : ",e);
        }

    };

    return (
        <RootLayout>
            <Nav />
            <Table className="text-center mt-4 w-full max-w-3xl mx-auto mt-10 mb-10" aria-label="Bookings table" style={{ margin: '0 auto' }}>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} style={{ textAlign: 'center' }}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={bookings}>
                    {(item) => (
                        <TableRow key={item.BID}>
                            {(columnKey, index) => (
                                <TableCell style={{ textAlign: 'center' }} key={index}>
                                    {columnKey !== 'delete' ? (
                                        columnKey === 'b_date' ? (
                                            formatDate(item[columnKey])
                                        ) : (
                                            item[columnKey]
                                        )
                                    ) : (
                                        <Button onClick={() => handleDelete(item.BID)} size="sm">
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function SalesDetail() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Detail</CardTitle>
        <CardDescription>View detailed sales information</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Detail will be rendered here</p>
      </CardContent>
      <CardFooter>
        <p>Footer content</p>
      </CardFooter>
    </Card>
  );
}

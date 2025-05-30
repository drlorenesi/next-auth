import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Chart</CardTitle>
        <CardDescription>Visualize sales data over time</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Chart will be rendered here</p>
      </CardContent>
      <CardFooter>
        <p>Footer content</p>
      </CardFooter>
    </Card>
  );
}

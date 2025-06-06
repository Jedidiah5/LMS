import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ListTodo } from "lucide-react";

const tasks = [
  { id: 1, name: "Complete Onboarding Module 1", status: "Completed", deadline: "2024-07-20", progress: 100 },
  { id: 2, name: "Setup Development Environment", status: "In Progress", deadline: "2024-07-22", progress: 50 },
  { id: 3, name: "Attend Team Introduction Meeting", status: "To Do", deadline: "2024-07-23", progress: 0 },
  { id: 4, name: "Submit First Code Review", status: "To Do", deadline: "2024-07-28", progress: 0 },
];

const overallProgress = tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length;

export default function DashboardPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case "In Progress":
        return <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-black">In Progress</Badge>;
      case "To Do":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">To Do</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground font-headline">My Dashboard</h1>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
            <ListTodo className="h-6 w-6 text-primary" />
            Overall Progress
          </CardTitle>
          <CardDescription>Your current progress across all assigned tasks and modules.</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="w-full h-4" />
          <p className="text-right text-sm text-muted-foreground mt-2">{overallProgress.toFixed(0)}% Complete</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <CheckCircle className="h-5 w-5 text-primary" />
              Assigned Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell>{task.deadline}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Clock className="h-5 w-5 text-primary" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {tasks.filter(task => task.status !== "Completed").slice(0, 3).map(task => (
                <li key={task.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                  <span className="text-sm font-medium">{task.name}</span>
                  <span className="text-xs text-muted-foreground">{task.deadline}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

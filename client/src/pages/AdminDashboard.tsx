import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  ShieldCheck,
  Users,
  BookOpen,
  Award,
  Mail,
  Settings,
  TrendingUp,
  Search,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: stats } = trpc.admin.stats.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });
  const { data: usersList, refetch: refetchUsers } = trpc.admin.users.useQuery(
    { search: searchTerm },
    { enabled: isAuthenticated && user?.role === "admin" }
  );
  const { data: messages } = trpc.admin.messages.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });
  const { data: certs } = trpc.admin.certificates.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });
  const { data: courses } = trpc.courses.list.useQuery();

  const updateRoleMutation = trpc.admin.updateUserRole.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث صلاحية المستخدم بنجاح!");
      refetchUsers();
    },
  });

  // Admin security check
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="container max-w-md py-20 flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-destructive" />
          <h2 className="text-2xl font-black text-primary">صلاحية مدير النظام مطلوبة</h2>
          <p className="text-xs text-muted-foreground">
            هذه المنطقة مخصصة لإدارة الأكاديمية والمشرفين المعتمدين فقط.
          </p>
          <Link href="/dashboard">
            <Button>العودة للوحة الطالب</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Admin Top Header */}
      <section className="bg-slate-900 text-white py-10 border-b border-slate-800">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-right">
              <Badge className="bg-amber-500 text-slate-950 font-black text-xs">
                لوحة الإدارة المركزية
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                إدارة أكاديمية الهدى التعليمية
              </h1>
              <p className="text-xs text-slate-400">
                متابعة الطلاب، المسارات التدريبية، الرسائل الواردة، وإصدار الشهادات المعتمدة.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="outline" className="text-xs text-white border-slate-700 hover:bg-slate-800">
                  معاينة واجهة الطالب
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Admin Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <Card className="p-4 bg-slate-800/90 border-slate-700 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">إجمالي الطلاب</span>
                <Users className="w-4 h-4 text-accent" />
              </div>
              <span className="text-2xl font-black mt-2 block">{stats?.totalStudents || 250}+</span>
            </Card>

            <Card className="p-4 bg-slate-800/90 border-slate-700 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">الدورات الفعالة</span>
                <BookOpen className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-2xl font-black mt-2 block">{stats?.totalCourses || 5}</span>
            </Card>

            <Card className="p-4 bg-slate-800/90 border-slate-700 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">إجمالي التسجيلات</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-2xl font-black mt-2 block">{stats?.totalEnrollments || 185}</span>
            </Card>

            <Card className="p-4 bg-slate-800/90 border-slate-700 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">الشهادات الصادرة</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-2xl font-black mt-2 block">{stats?.totalCertificates || 2}</span>
            </Card>
          </div>
        </div>
      </section>

      {/* Admin Tabs */}
      <section className="py-10 flex-1">
        <div className="container">
          <Tabs defaultValue="students" className="space-y-6">
            <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <TabsTrigger value="students" className="font-bold text-xs sm:text-sm">
                المستخدمون والطلاب
              </TabsTrigger>
              <TabsTrigger value="courses" className="font-bold text-xs sm:text-sm">
                إدارة الدورات ({courses?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="messages" className="font-bold text-xs sm:text-sm">
                رسائل التواصل ({messages?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="certificates" className="font-bold text-xs sm:text-sm">
                الشهادات المعتمدة ({certs?.length || 0})
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="students" className="space-y-4">
              <div className="flex items-center justify-between gap-4 bg-white dark:bg-card p-4 rounded-xl border border-border">
                <div className="relative w-full max-w-sm">
                  <Search className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="بحث بالاسم أو البريد..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-9 text-xs"
                  />
                </div>
                <span className="text-xs text-muted-foreground font-semibold">
                  عدد السجلات: {usersList?.length || 0}
                </span>
              </div>

              <div className="bg-white dark:bg-card rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">البريد الإلكتروني</TableHead>
                      <TableHead className="text-right">الدور الحالي</TableHead>
                      <TableHead className="text-right">تاريخ الانضمام</TableHead>
                      <TableHead className="text-left">تعديل الصلاحية</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersList?.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-bold text-primary">{u.name || "مستخدم"}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{u.email || "-"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {u.role === "admin" ? "مدير النظام" : u.role === "instructor" ? "مدرب" : "طالب"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(u.createdAt).toLocaleDateString("ar-SA")}
                        </TableCell>
                        <TableCell className="text-left">
                          <Select
                            value={u.role}
                            onValueChange={(newRole: any) =>
                              updateRoleMutation.mutate({ userId: u.id, role: newRole })
                            }
                          >
                            <SelectTrigger className="w-32 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">طالب</SelectItem>
                              <SelectItem value="instructor">مدرب</SelectItem>
                              <SelectItem value="admin">مدير النظام</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses?.map((c) => (
                  <Card key={c.id} className="p-4 border-border bg-white dark:bg-card space-y-3">
                    <img src={c.imageUrl} alt={c.title} className="w-full aspect-video rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-primary line-clamp-1">{c.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{c.shortDescription}</p>
                    </div>
                    <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-600">التسجيل عبر الواتساب</span>
                      <span className="text-muted-foreground">{c.studentCount} طالب مسجل</span>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Contact Messages Tab */}
            <TabsContent value="messages" className="space-y-4">
              {messages?.length === 0 ? (
                <p className="text-center py-10 text-muted-foreground">لا توجد رسائل جديدة.</p>
              ) : (
                <div className="space-y-3">
                  {messages?.map((m) => (
                    <Card key={m.id} className="p-5 border-border bg-white dark:bg-card space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-base text-primary">{m.subject}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(m.createdAt).toLocaleDateString("ar-SA")}
                        </span>
                      </div>
                      <p className="text-xs text-accent font-semibold">
                        من: {m.name} ({m.email}) {m.phone && `- هاتف: ${m.phone}`}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                        {m.message}
                      </p>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value="certificates" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certs?.map((cert) => (
                  <Card key={cert.id} className="p-5 border-border bg-white dark:bg-card space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-accent">{cert.certificateCode}</span>
                      <Badge className="bg-emerald-600 text-white text-[10px]">معتمدة</Badge>
                    </div>
                    <h4 className="font-bold text-sm text-primary">{cert.courseTitle}</h4>
                    <p className="text-xs text-muted-foreground">المتدرب: {cert.studentName} • التقدير: {cert.grade}</p>
                    <p className="text-[11px] text-muted-foreground">
                      تاريخ الإصدار: {new Date(cert.issuedAt).toLocaleDateString("ar-SA")}
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}

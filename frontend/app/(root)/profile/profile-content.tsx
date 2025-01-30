"use client";

import { useState } from "react";
import type {
  User,
  Project,
  Achievement,
  Extracurricular,
  PortfolioItem,
  PrivacySettings,
} from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Edit,
  Plus,
} from "lucide-react";
import {
  updateUserProfile,
  updatePrivacySettings,
  addProject,
  addAchievement,
  addExtracurricular,
  addPortfolioItem,
  fetchProfileData,
} from "@/actions/user.actions";
import { format } from "date-fns";

type ProfileWithRelations = User & {
  projects: Project[];
  achievements: Achievement[];
  extracurriculars: Extracurricular[];
  portfolioItems: PortfolioItem[];
  privacySettings: PrivacySettings | null;
};

interface ProfileContentProps {
  profile: ProfileWithRelations;
  isOwnProfile: boolean;
}

export default function ProfileContent({
  profile,
  isOwnProfile,
}: ProfileContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    skills: "",
  });
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [newExtracurricular, setNewExtracurricular] = useState({
    name: "",
    role: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: "",
    description: "",
    url: "",
  });

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(profile.id, {
        name: editedProfile.name,
        username: editedProfile.username,
        major: editedProfile.major || undefined,
        year: editedProfile.year || undefined,
        bio: editedProfile.bio || undefined,
        githubUrl: editedProfile.githubUrl || undefined,
        linkedinUrl: editedProfile.linkedinUrl || undefined,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleAddProject = async () => {
    try {
      await addProject(profile.id, {
        ...newProject,
        skills: newProject.skills.split(",").map((skill) => skill.trim()),
      });
      setNewProject({ title: "", description: "", skills: "" });
      fetchProfileData(profile.id);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleAddAchievement = async () => {
    try {
      await addAchievement(profile.id, newAchievement);
      setNewAchievement({ title: "", description: "", date: "" });
      fetchProfileData(profile.id);
    } catch (error) {
      console.error("Error adding achievement:", error);
    }
  };

  const handleAddExtracurricular = async () => {
    try {
      await addExtracurricular(profile.id, newExtracurricular);
      setNewExtracurricular({
        name: "",
        role: "",
        description: "",
        startDate: "",
        endDate: "",
      });
      fetchProfileData(profile.id);
    } catch (error) {
      console.error("Error adding extracurricular:", error);
    }
  };

  const handleAddPortfolioItem = async () => {
    try {
      await addPortfolioItem(profile.id, newPortfolioItem);
      setNewPortfolioItem({ title: "", description: "", url: "" });
      fetchProfileData(profile.id);
    } catch (error) {
      console.error("Error adding portfolio item:", error);
    }
  };

  const handlePrivacySettingsChange = async (
    setting: keyof PrivacySettings
  ) => {
    if (profile.privacySettings) {
      try {
        const updatedSettings = {
          ...profile.privacySettings,
          [setting]: !profile.privacySettings[setting],
        };
        await updatePrivacySettings(profile.id, updatedSettings);
        setEditedProfile((prev) => ({
          ...prev,
          privacySettings: updatedSettings,
        }));
      } catch (error) {
        console.error("Error updating privacy settings:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={profile.avatarUrl || undefined}
                alt={profile.name}
              />
              <AvatarFallback>
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{profile.name}</CardTitle>
              <CardDescription>@{profile.username}</CardDescription>
              <CardDescription>
                {profile.major}, {profile.year}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editedProfile.name}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={editedProfile.username}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="major">Major</Label>
                <Input
                  id="major"
                  value={editedProfile.major || ""}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      major: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={editedProfile.year || ""}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, year: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={editedProfile.bio || ""}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, bio: e.target.value })
                  }
                  placeholder="Tell us about yourself"
                />
              </div>
              <div>
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  value={editedProfile.githubUrl || ""}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      githubUrl: e.target.value,
                    })
                  }
                  placeholder="https://github.com/yourusername"
                />
              </div>
              <div>
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  value={editedProfile.linkedinUrl || ""}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      linkedinUrl: e.target.value,
                    })
                  }
                  placeholder="https://www.linkedin.com/in/yourusername"
                />
              </div>
            </div>
          ) : (
            <>
              <p className="mb-4">{profile.bio}</p>
              <div className="flex space-x-4">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <Github className="h-4 w-4" />
                    </Button>
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </a>
                )}
                {profile.privacySettings?.showEmail && (
                  <a href={`mailto:${profile.email}`}>
                    <Button variant="outline" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </a>
                )}
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          {isOwnProfile &&
            (isEditing ? (
              <Button onClick={handleSaveProfile}>Save Profile</Button>
            ) : (
              <Button onClick={handleEditProfile}>Edit Profile</Button>
            ))}
          {!isOwnProfile && (
            <Button>
              <MessageCircle className="mr-2 h-4 w-4" />
              Message
            </Button>
          )}
        </CardFooter>
      </Card>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="extracurriculars">Extracurriculars</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {profile.projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            {isOwnProfile && (
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="flex items-center justify-center cursor-pointer">
                    <CardContent>
                      <Plus className="h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">Add Project</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                    <DialogDescription>
                      Enter the details of your new project.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="project-title">Title</Label>
                      <Input
                        id="project-title"
                        value={newProject.title}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea
                        id="project-description"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-skills">
                        Skills (comma-separated)
                      </Label>
                      <Input
                        id="project-skills"
                        value={newProject.skills}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            skills: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddProject}>Add Project</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="space-y-4">
            {profile.achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <CardTitle>{achievement.title}</CardTitle>
                  <CardDescription>
                    {format(new Date(achievement.date), "MMMM dd, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
            {isOwnProfile && (
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="flex items-center justify-center cursor-pointer">
                    <CardContent>
                      <Plus className="h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        Add Achievement
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Achievement</DialogTitle>
                    <DialogDescription>
                      Enter the details of your new achievement.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="achievement-title">Title</Label>
                      <Input
                        id="achievement-title"
                        value={newAchievement.title}
                        onChange={(e) =>
                          setNewAchievement({
                            ...newAchievement,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="achievement-description">
                        Description
                      </Label>
                      <Textarea
                        id="achievement-description"
                        value={newAchievement.description}
                        onChange={(e) =>
                          setNewAchievement({
                            ...newAchievement,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="achievement-date">Date</Label>
                      <Input
                        id="achievement-date"
                        type="date"
                        value={newAchievement.date}
                        onChange={(e) =>
                          setNewAchievement({
                            ...newAchievement,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddAchievement}>
                      Add Achievement
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </TabsContent>

        <TabsContent value="extracurriculars">
          <div className="space-y-4">
            {profile.extracurriculars.map((activity) => (
              <Card key={activity.id}>
                <CardHeader>
                  <CardTitle>{activity.name}</CardTitle>
                  <CardDescription>{activity.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{activity.description}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {format(new Date(activity.startDate), "MMMM yyyy")} -
                    {activity.endDate
                      ? format(new Date(activity.endDate), "MMMM yyyy")
                      : "Present"}
                  </p>
                </CardContent>
              </Card>
            ))}
            {isOwnProfile && (
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="flex items-center justify-center cursor-pointer">
                    <CardContent>
                      <Plus className="h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        Add Extracurricular Activity
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Extracurricular Activity</DialogTitle>
                    <DialogDescription>
                      Enter the details of your new extracurricular activity.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="extracurricular-name">Name</Label>
                      <Input
                        id="extracurricular-name"
                        value={newExtracurricular.name}
                        onChange={(e) =>
                          setNewExtracurricular({
                            ...newExtracurricular,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="extracurricular-role">Role</Label>
                      <Input
                        id="extracurricular-role"
                        value={newExtracurricular.role}
                        onChange={(e) =>
                          setNewExtracurricular({
                            ...newExtracurricular,
                            role: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="extracurricular-description">
                        Description
                      </Label>
                      <Textarea
                        id="extracurricular-description"
                        value={newExtracurricular.description}
                        onChange={(e) =>
                          setNewExtracurricular({
                            ...newExtracurricular,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="extracurricular-start-date">
                        Start Date
                      </Label>
                      <Input
                        id="extracurricular-start-date"
                        type="date"
                        value={newExtracurricular.startDate}
                        onChange={(e) =>
                          setNewExtracurricular({
                            ...newExtracurricular,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="extracurricular-end-date">
                        End Date (leave blank if ongoing)
                      </Label>
                      <Input
                        id="extracurricular-end-date"
                        type="date"
                        value={newExtracurricular.endDate}
                        onChange={(e) =>
                          setNewExtracurricular({
                            ...newExtracurricular,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddExtracurricular}>
                      Add Extracurricular
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </TabsContent>

        <TabsContent value="portfolio">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {profile.portfolioItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{item.description}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">View Project</Button>
                  </a>
                </CardContent>
              </Card>
            ))}
            {isOwnProfile && (
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="flex items-center justify-center cursor-pointer">
                    <CardContent>
                      <Plus className="h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        Add Portfolio Item
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Portfolio Item</DialogTitle>
                    <DialogDescription>
                      Enter the details of your new portfolio item.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="portfolio-title">Title</Label>
                      <Input
                        id="portfolio-title"
                        value={newPortfolioItem.title}
                        onChange={(e) =>
                          setNewPortfolioItem({
                            ...newPortfolioItem,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="portfolio-description">Description</Label>
                      <Textarea
                        id="portfolio-description"
                        value={newPortfolioItem.description}
                        onChange={(e) =>
                          setNewPortfolioItem({
                            ...newPortfolioItem,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="portfolio-url">URL</Label>
                      <Input
                        id="portfolio-url"
                        value={newPortfolioItem.url}
                        onChange={(e) =>
                          setNewPortfolioItem({
                            ...newPortfolioItem,
                            url: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddPortfolioItem}>
                      Add Portfolio Item
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {isOwnProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>
              Control what information is visible to other users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-email">Show Email</Label>
                <Switch
                  id="show-email"
                  checked={profile.privacySettings?.showEmail}
                  onCheckedChange={() =>
                    handlePrivacySettingsChange("showEmail")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-projects">Show Projects</Label>
                <Switch
                  id="show-projects"
                  checked={profile.privacySettings?.showProjects}
                  onCheckedChange={() =>
                    handlePrivacySettingsChange("showProjects")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-achievements">Show Achievements</Label>
                <Switch
                  id="show-achievements"
                  checked={profile.privacySettings?.showAchievements}
                  onCheckedChange={() =>
                    handlePrivacySettingsChange("showAchievements")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-extracurriculars">
                  Show Extracurriculars
                </Label>
                <Switch
                  id="show-extracurriculars"
                  checked={profile.privacySettings?.showExtracurriculars}
                  onCheckedChange={() =>
                    handlePrivacySettingsChange("showExtracurriculars")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-portfolio">Show Portfolio</Label>
                <Switch
                  id="show-portfolio"
                  checked={profile.privacySettings?.showPortfolio}
                  onCheckedChange={() =>
                    handlePrivacySettingsChange("showPortfolio")
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

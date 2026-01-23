import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Section } from '@/components/layout/Section';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TeamMember {
    name: string;
    role: string;
    image?: string;
    bio?: string;
}

interface TeamProps {
    title: string;
    subtitle?: string;
    members: TeamMember[];
    background?: 'white' | 'muted' | 'none' | 'brand';
}

export function Team({ title, subtitle, members, background = "white" }: TeamProps) {
    return (
        <Section background={background}>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
                {subtitle && (
                    <p className={cn("text-lg", background === 'brand' ? "text-primary-foreground/90" : "text-muted-foreground")}>{subtitle}</p>
                )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {members.map((member, index) => (
                    <Card key={index} className="border-none shadow-none hover:shadow-lg transition-all text-center group">
                        <CardHeader className="pt-8">
                            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-muted group-hover:border-primary transition-colors">
                                <AvatarImage src={member.image} alt={member.name} />
                                <AvatarFallback className="text-2xl font-bold">{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-sm font-medium text-primary">{member.role}</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Section>
    );
}

# Generated by Django 3.1.7 on 2021-04-21 18:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150, verbose_name='Title')),
                ('participants', models.IntegerField(verbose_name='Participants Number')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('start_at', models.DateTimeField(verbose_name='Expire Time')),
                ('longitude', models.FloatField(verbose_name='Longitude')),
                ('latitude', models.FloatField(verbose_name='Latitude')),
                ('is_expired', models.BooleanField(verbose_name='Is Expired')),
            ],
            options={
                'verbose_name': 'Meeting',
                'verbose_name_plural': 'Meetings',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=150, verbose_name='First Name')),
                ('lastname', models.CharField(max_length=150, verbose_name='Last Name')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='static/imgs')),
                ('email', models.EmailField(max_length=254, verbose_name='Email')),
                ('password', models.CharField(max_length=150)),
                ('tags', models.ManyToManyField(to='mainapp.Tag')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
            },
        ),
        migrations.CreateModel(
            name='MeetingRate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(verbose_name='Score')),
                ('meeting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.meeting', verbose_name='Rated Meeting')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='mainapp.user', verbose_name='Participant')),
            ],
            options={
                'verbose_name': 'Rating',
                'verbose_name_plural': 'Ratings',
            },
        ),
        migrations.AddField(
            model_name='meeting',
            name='headman',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='mainapp.user', verbose_name='Headman'),
        ),
        migrations.AddField(
            model_name='meeting',
            name='tags',
            field=models.ManyToManyField(to='mainapp.Tag'),
        ),
        migrations.AddField(
            model_name='meeting',
            name='users',
            field=models.ManyToManyField(to='mainapp.User'),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField(verbose_name='Comment')),
                ('meeting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.meeting', verbose_name='Commented Meeting')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='mainapp.user', verbose_name='Participant')),
            ],
            options={
                'verbose_name': 'Comment',
                'verbose_name_plural': 'Comments',
            },
        ),
    ]
